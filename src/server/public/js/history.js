
// https://github.com/nicoespeon/gitgraph.js/tree/master/packages/gitgraph-js

// eslint-disable-next-line no-unused-vars
function renderGraph(history) {
  const graphContainer = document.getElementById("graph-container")

  const loading = document.getElementById("graph-container-loading")
  const max = history.reproductionSteps.length
  loading.textContent = "Rendering " + max + " nodes, this may take a while"
  // Instantiate the graph.
  // eslint-disable-next-line no-undef
  const gitgraph = GitgraphJS.createGitgraph(graphContainer, gitGraphOptions)

  setTimeout(() => {
    const usedBranchNames = { 0: true }
    const branches = { 0:  gitgraph.branch("master") }
    for (const step of history.reproductionSteps) {
      if (step.type === "commit") {
        if (!branches[step.branch]) {
          const parentBranch = branches[step.parentBranch]
          let availableBranchName = 0
          while(usedBranchNames[availableBranchName]) availableBranchName++

          branches[step.branch] = parentBranch.branch(availableBranchName + "")
          usedBranchNames[availableBranchName] = true
        }

        branches[step.branch].commit(step.message)
      }

      if (step.type === "merge") {
        const targetBranch = branches[step.branch]
        for (const sourceBranchName of step.branches) {
          targetBranch.merge(branches[sourceBranchName], step.message)
          delete usedBranchNames[parseInt(branches[sourceBranchName].name, 10)]
        }
      }
    }

    loading.textContent = ""
  }, 0)

  // Simulate git commands with Gitgraph API.
  // const master = gitgraph.branch("master")
  // master.commit("Initial commit")

  // const develop = gitgraph.branch("develop")
  // develop.commit("Add TypeScript")

  // const aFeature = gitgraph.branch("a-feature")
  // aFeature
  //   .commit("Make it work")
  //   .commit("Make it right")
  //   .commit("Make it fast")

  // develop.merge(aFeature)
  // develop.commit("Prepare v1")

  // master.merge(develop).tag("v1.0.0")
}