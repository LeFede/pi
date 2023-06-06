const { getVideogamesQueryAdapter } = require("#adapters")

module.exports = async (req, res) => {
  const { search } = req.query
  try {
    const response = await getVideogamesQueryAdapter(search)
    res.status(200).send(response)
  } catch (error) {
    res.status(404).send({ error })
  }
}
