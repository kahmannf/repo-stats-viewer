/* eslint-disable no-unused-vars */
const server = require("./server")
server({ port: 3000 })

// const GitRunner = require("./git-runner")
// const { loadFileTree } = require("./tree-loader")
// const { createFileSizeDataSet } = require("./generators/file-sizes")
// const fs = require("fs")

// async function main() {
//   const runner = new GitRunner("../jquery")

//   const x = await runner.getHistory("HEAD")

//   console.log("test")
//   // const tree = await loadFileTree(runner, "HEAD")
//   // const dataSet = createFileSizeDataSet(tree)

//   // fs.writeFileSync("data.json", JSON.stringify(dataSet))
// }

// main().then(() => console.log("done")).catch((err) => console.log(err))
