const { Videogame } = require("#db")

module.exports = async (req, res) => {
  const { name, description, rating, genres, released } = req.body
  try {
    const newVideogame = await Videogame.create({
      name,
      description,
      rating,
      genres,
      released
    })
    res.status(200).json({ message: newVideogame })
  } catch (err) {
    res.status(400).json({ message: err })
  }
}
