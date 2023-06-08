const { getVideogamesAdapter } = require("#adapters")
const { Videogame } = require("#db")

module.exports = async (_, res) => {
  try {
    const videogamesFromApi = await getVideogamesAdapter()
    const videogamesFromDB = await Videogame.findAll()
    res.status(200).send([...videogamesFromApi, ...videogamesFromDB])
  } catch (error) {
    res.status(404).send({ error })
  }
}
