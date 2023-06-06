const { getGenresAdapter } = require("#adapters")
const { Genre } = require("#db")

module.exports = async (_, res) => {
  try {
    // ? ~ Is this a good practice?
    let genres = await Genre.findAll()

    if (genres.length) return res.status(200).send(genres)

    genres = await getGenresAdapter()
    Genre.bulkCreate(genres)
    res.status(200).send(genres)

  } catch (err) {

  }
}
