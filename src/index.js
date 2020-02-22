

// const server = require("./server")
// server({ port: 3000 })
const GitRunner = require("./generator/git-runner")
const { loadFileTree } = require("./generator/tree-loader")
async function main() {
  const runner = new GitRunner(".")

  const tree = await loadFileTree(runner, "HEAD")
}

main().then(() => console.log("done")).catch((err) => console.log(err))
