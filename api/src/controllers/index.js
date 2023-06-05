const videogames = require("./videogames")
const genres     = require("./genres")

module.exports = {
  ...videogames,
  ...genres,
}
