const express = require("express")
const routes = require("./routes")

/**
 * 
 * @param {{ port: number }} config 
 */
function server(config) {

  const app = express()

  app.use(routes())
  app.use(express.static(__dirname + "/public"))

  app.listen(config.port, () => {
    console.log(`Listening on http://localhost:${config.port}`)
  })
  return app
}

module.exports = server