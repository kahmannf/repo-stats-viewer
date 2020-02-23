// eslint-disable-next-line no-unused-vars
const Commit = require("./commit")
const { IterableTransform } = require("@kahmannf/iterable-transforms")

class CommitHistory {

  /**
   * 
   * @param {Commit[]} commits 
   */
  constructor(commits) {
    /** @type {{ [id: string]: boolean }} object to check whether a commit has children */
    const hastChildrenMap = {}
    commits = commits.sort((a, b) => a.commitUnixTimestamp - b.commitUnixTimestamp)
    let currentMaxBranch = 0

    this.initlaCommit = commits.find(x => x.parents.length === 0)
    if(!this.initlaCommit) {
      this.initlaCommit = commits[0]
    }

    /** @type {{ [id: string]: HistoryCommit }} */
    this.commits = {}
    this.commits[this.initlaCommit.id] = new HistoryCommit(this.initlaCommit, currentMaxBranch)

    /** @type {(CommitStep|MergeStep)[]} */
    this.reproductionSteps = [new CommitStep(this.initlaCommit.id, currentMaxBranch, this.initlaCommit.message, undefined)]
    let topLevelSteps = [...this.reproductionSteps]
    commits.splice(commits.findIndex(x => x === this.initlaCommit), 1)

    while (topLevelSteps.length > 0) {
      const arr = new IterableTransform(topLevelSteps)
        .map(step => ({ step, children: commits.filter(x => x.parents.indexOf(step.id) !== -1) }))
        .flatMap(stepAndChildren => stepAndChildren.children.map(child => ({ ancestor: stepAndChildren.step, child })))
        .sort(x => x.child.commitUnixTimestamp).toArray()
      
      const { child, ancestor } = arr[0]

      const childIndex = commits.indexOf(child)
      commits.splice(childIndex, 1)
      
      if (child.parents.length === 1) {
        const branch = hastChildrenMap[ancestor.id] ? ++currentMaxBranch : ancestor.branch
        const next = new CommitStep(child.id, branch, child.message, ancestor.branch)
        this.reproductionSteps.push(next)
        topLevelSteps.push(next)
        this.commits[child.id] = new HistoryCommit(child, next.branch)
        hastChildrenMap[ancestor.id] = true
      }

      if (child.parents.length > 1) {
        const parents = child.parents.map(x => this.commits[x]).filter(x => x)
        const map = {}
        parents.forEach(x => map[x.id] = x.branch)
        const next = new MergeStep(child.id, map, child.message)
        this.reproductionSteps.push(next)
        topLevelSteps.push(next)
        this.commits[child.id] = new HistoryCommit(child, next.branch)
      }

      topLevelSteps = new IterableTransform(topLevelSteps)
        .filter(step => commits.some(x => x.parents.indexOf(step.id) !== -1))
        .toArray()
    }
    
    if (commits.length > 1) {
      console.log(commits.length + " original commits that were not used remaining")
    }
  }

}

class CommitStep {
  /**
   * 
   * @param {string} id 
   * @param {number} branch
   * @param {string} message
   * @param {number} parentBranch
   */
  constructor(id, branch, message, parentBranch) {
    this.id = id
    this.branch = branch
    this.type = "commit",
    this.message = message
    this.parentBranch = parentBranch
  }
}

class MergeStep {
  /**
   * 
   * @param {string} id 
   * @param {{ [parentId: string]: number }} parentBranchMap 
   * @param {string} message
   */
  constructor(id, parentBranchMap, message) {
    this.id = id
    this.parentBranchMap = parentBranchMap
    this.parents = Object.keys(parentBranchMap)
    this.branches = this.parents.map(x => parentBranchMap[x])
    // Expecting to lowest branch-number to win
    this.branch = Math.min(...this.branches)
    this.type = "merge"
    this.message = message
  }
}

class HistoryCommit extends Commit {

  /**
   * 
   * @param {Commit} commit 
   * @param {number} branch 
   */
  constructor(commit, branch) {
    super(commit.id, commit.tree, commit.parents, commit.author, commit.committer, commit.message, commit.commitUnixTimestamp)
    this.branch = branch
  }

}

CommitHistory.HistoryCommit = HistoryCommit

module.exports = CommitHistory
