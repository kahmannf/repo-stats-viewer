
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
    this.files = files
  }
}

module.exports = FileTree
