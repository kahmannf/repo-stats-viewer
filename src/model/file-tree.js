// eslint-disable-next-line no-unused-vars
const FileInfo = require("./file-info")

class FileTree {
  /**
   * @param {string} name 
   * @param {FileTree[]} subTrees 
   * @param {FileInfo[]} files 
   */
  constructor(
    name,
    subTrees,
    files
  ) {
    this.name = name
    this.subTrees = subTrees
    subTrees.forEach(x => x.parent = this)
    this.files = files
    files.forEach(x => x.parent = this)
    /** @type {FileTree} */
    this.parent = undefined
  }
}

module.exports = FileTree
