const express = require("express")

const history = require("./history")

function routes(gitRunner) {
  const router = express.Router()

  router.use("/history", history(gitRunner))

  return router
}

module.exports = routes