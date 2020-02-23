const express = require("express")
// eslint-disable-next-line no-unused-vars
const GitRunner = require("../../git-runner")

/**
 * 
 * @param {GitRunner} gitRunner 
 */
function historyRoutes(gitRunner) {
  const router = express.Router()

  // eslint-disable-next-line no-unused-vars
  router.get("/", async(req, res) => {
    const history = await gitRunner.getHistory("HEAD")
    res.json(history)
  })

  return router
}

module.exports = historyRoutes