const { exec } = require("child_process")
const Tree = require("./model/tree")
const splitSort = require("./utils/split-sort")
const FileTree = require("./model/file-tree")
const FileInfo = require("./model/file-info")
const Commit = require("./model/commit")

class GitRunner {

  /**
   * 
   * @param {string} repo 
   */
  constructor(
    repo
  ) {
    this.repo = repo
    this.prettyCatCache = {}
  }

  /**
   * 
   * @param {string[]} commands
   * @returns {Promise<string>}
   */
  runGit(commands, trimWhitespace = true) {
    return new Promise((resolve, reject) => {
      exec("git " + commands.join(" "), {
        cwd: this.repo
      }, (err, stdout) => {
        if (err) {
          reject(err)
          return
        }
        resolve(trimWhitespace ? stdout.trim() : stdout)
      })
    })  
  }

  /**
   * 
   * @param {string} ref
   * @returns {Promise<string>} 
   */
  revParse(ref) {
    return this.runGit(["rev-parse", ref])  
  }

  /**
   * 
   * @param {string} ref
   * @returns {Promise<'blob' | 'tree' | 'commit' | 'tag'>}
   */
  getObjectType(ref) {
    return this.runGit(["cat-file", "-t", ref])
  }

  /**
   * 
   * @param {string} ref 
   */
  async prettyCat(ref, cache = true) {
    if (this.prettyCatCache[ref]) {
      return
    }

    const res = await this.runGit(["cat-file", "-p", ref])
    
    if(cache) {
      this.prettyCatCache[ref] = res
    }
    return res
  }

  /**
   * 
   * @param {string} treeRef
   * @returns {Promise<Tree>}
   */
  async lsTree(treeRef) {
    const lsTreeOut = await this.runGit(["ls-tree", treeRef])
    const nodes = Tree.parse(lsTreeOut)
    return new Tree(treeRef, nodes)
  }

  /**
   * 
   * @param {string} treeRef 
   * @param {string} path 
   * @param {boolean} checkRefType 
   * @returns {Promise<FileTree>}
   */
  async loadFileTreeSnapshot(treeRef, name = "", options = { checkRefType: true, cache: true }) {
    if (options.checkRefType) {
      const type = await this.getObjectType(treeRef)
      if (type !== "tree") {
        throw new Error(`Cannot read tree ${treeRef}. Invalid type! Type is: ${type}`)
      }
    }

    const tree = await this.lsTree(treeRef)
    const { blobs, subTrees } = splitSort(tree.nodes, {
      blobs: x => x.type === "blob",
      subTrees: x => x.type === "tree"
    })

    const asyncFiles = Promise.all(blobs.map(x => this.prettyCat(x.id).then(content => new FileInfo(x.file, content))))
    const asyncTrees = Promise.all(subTrees.map(x => this.loadFileTreeSnapshot(x.id, x.file, { checkRefType: false, cache: options.cache })))

    /** @type {[FileInfo[],FileTree[]]} */
    const [files, trees] = await Promise.all([asyncFiles, asyncTrees])

    return new FileTree(
      name,
      trees,
      files
    )
  }

  /**
   * 
   * @param {string} ref 
   * @returns {Commit}
   */
  async getCommit(ref) {
    const text = await this.prettyCat(ref)
    return Commit.parse(ref, text) 
  } 
}

module.exports = GitRunner
