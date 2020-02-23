class Commit {

  /**
   * 
   * @param {string} id 
   * @param {string} tree 
   * @param {string[]} parents 
   * @param {string} author 
   * @param {string} committer 
   * @param {string} message
   * @param {number} commitUnixTimestamp
   */
  constructor(
    id,
    tree,
    parents,
    author,
    committer,
    message,
    commitUnixTimestamp
  ) {
    this.id = id,
    this.tree = tree,
    this.parents = parents,
    this.author = author,
    this.committer = committer
    this.message = message
    this.commitUnixTimestamp = commitUnixTimestamp
  }
}

/**
 * 
 * @param {string} catFileOutput
 * @returns {Commit}
 */
Commit.parseCatFile = function (commitId, catFileOutput) {
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

/**
 * 
 * @param {string} historyLine
 */
Commit.parseLogHistory= function(historyLine) {
  const [hashSplit,treeSplit,parentsSplit,authorSplit,committerSplit,timestampSplit,subjectSplit] = historyLine.split(";").map(x => x.split("="))

  return new Commit(
    hashSplit[1],
    treeSplit[1],
    parentsSplit[1].split(" ").filter(x => typeof x === "string" && x.length > 0),
    authorSplit[1],
    committerSplit[1],
    subjectSplit[1],
    parseInt(timestampSplit[1], 10)
  )
}

module.exports = Commit