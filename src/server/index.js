const express = require("express")
const routes = require("./routes")
const GitRunner = require("../git-runner")

/**
 * 
 * @param {{ port: number }} config 
 */
function server(config) {

  const app = express()

  const gitRunner = new GitRunner(".")

  app.use(routes(gitRunner))
  app.use(express.static(__dirname + "/public"))

  app.listen(config.port, () => {
    console.log(`Listening on http://localhost:${config.port}`)
  })
  return app
}

module.exports = server