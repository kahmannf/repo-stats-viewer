// eslint-disable-next-line no-unused-vars
const FileTree = require("../model/file-tree")

/**
 * 
 * @param {FileTree} fileTree
 */
function createFileSizeDataSet(fileTree, path = "", existing = {}) {
  /** @type {{ [file: string]: FileSizeInfo } */
  const result = existing

  for(const file of fileTree.files) {
    const fullName = path + file.name 
    result[fullName] = new FileSizeInfo(fullName, file.name, file.content.length, (file.content.match(/\n/g) || []).length)
  }

  for (const subTree of fileTree.subTrees) {
    createFileSizeDataSet(subTree, path + subTree.name + "/", result)
  }

  return result
}



class FileSizeInfo {
  constructor(fullName, name, bytes, lines) {
    this.fullName = fullName
    this.name = name
    this.bytes = bytes
    this.lines = lines
  }
}

module.exports = {
  FileSizeInfo,
  createFileSizeDataSet
}