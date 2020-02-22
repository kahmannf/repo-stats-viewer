class Commit {

  /**
   * 
   * @param {string} id 
   * @param {string} tree 
   * @param {string[]} parents 
   * @param {string} author 
   * @param {string} committer 
   * @param {string} message
   */
  constructor(
    id,
    tree,
    parents,
    author,
    committer,
    message
  ) {
    this.id = id,
    this.tree = tree,
    this.parents = parents,
    this.author = author,
    this.committer = committer
    this.message = message
  }
}

/**
 * 
 * @param {string} catFileOutput
 * @returns {Commit}
 */
Commit.parse = function (commitId, catFileOutput) {
  const lines = catFileOutput.split("\n")
  
  let run = true, tree, parents = [], author, comitter, message
  for (let i = 0; run && i < lines.length; i++) {
    const line = lines[i]
    const spaceIndex = line.indexOf(" ")
    const kind = line.substr(0, spaceIndex)
    const content = line.substr(spaceIndex)

    switch(kind) {
      case "tree":
        tree = content
        break
      case "parent":
        parents.push(content)
        break
      case "author":
        author = content
        break
      case "committer":
        comitter = content
        message = lines.slice(i + 1).join("\n")
        run = false
        break
    }
  }

  return new Commit(
    commitId,
    tree,
    parents,
    author,
    comitter,
    message
  )
}

module.exports = Commit