const { Videogame, Genre } = require("#db")

module.exports = async (req, res) => {
  // TODO: receive genres
  const { name, description, rating, released, image, platforms } = req.body

  try {
    const newVideogame = await Videogame.create({
      name,
      description,
      rating,
      released,
      image,
      platforms,
    })

    // TODO: id must be dynamic
    const genres = await Genre.findOne({ where: { id: 4 } }) 
    const genres2 = await Genre.findOne({ where: { id: 3 } })

    newVideogame.setGenres([genres, genres2])

    res.status(200).send({ message: newVideogame })
  } catch (error) {
    res.status(400).send({ error })
  }
}
