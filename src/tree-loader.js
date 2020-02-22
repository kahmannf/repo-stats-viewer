// eslint-disable-next-line no-unused-vars
const GitRunner = require("./git-runner")

/**
 * 
 * @param {GitRunner} runner
 * @param {string} commitId
 */
async function loadFileTree(runner, commitId) {
  const commit = await runner.getCommit(commitId)
  const tree = await runner.loadFileTreeSnapshot(commit.tree)
  return tree
}


module.exports = {
  loadFileTree
}