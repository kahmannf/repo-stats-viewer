// eslint-disable-next-line no-unused-vars
const FileTree = require("./file-tree")

class FileInfo {
  /**
   * 
   * @param {string} name 
   * @param {string} content 
   */
  constructor (
    name,
    content
  ) {
    this.name = name
    this.content = content
    /** @type {FileTree} */
    this.parent = undefined
  }

}

module.exports = FileInfo
