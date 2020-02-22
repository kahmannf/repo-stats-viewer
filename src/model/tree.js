class Tree {
  /**
   *  
   * @param {string} id 
   * @param {TreeNode[]} nodes 
   */
  constructor(id, nodes) {
    this.id = id,
    this.nodes = nodes
  }
}

class TreeNode {
  /**
   * 
   * @param {string} mode 
   * @param {'blob' | 'tree'} type 
   * @param {string} id 
   * @param {string} file 
   */
  constructor(
    mode,
    type,
    id,
    file
  ) {
    this.mode = mode
    this.type = type
    this.id = id
    this.file = file
  }
}

/**
 * @param {string} lsTreeStdOut
 * @returns {TreeNode[]}
 */
Tree.parse = function (lsTreeStdOut) {
  const lines = lsTreeStdOut.split("\n")
  const result = []
  for(const line of lines) {
    const [mode, type, idAndFile] = line.split(" ")
    const [id, file] = idAndFile.split("\t")
    result.push(new TreeNode(mode, type, id, file))
  }
  return result
}

Tree.TreeNode = TreeNode

module.exports = Tree
