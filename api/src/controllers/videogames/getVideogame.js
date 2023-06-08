const { getVideogameAdapter } = require("#adapters")
const { Videogame } = require("#db")

module.exports = async (req, res) => {
  const { id } = req.params
  try {
    const videogameFound = await getVideogameAdapter(id)
    res.status(200).send(videogameFound)
  } catch (error) {
    res.status(404).send({ error })
  }
}

