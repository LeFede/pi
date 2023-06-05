const { getVideogameAdapter } = require("#adapters")

module.exports = async (req, res) => {
  const { id } = req.params
  try {
    const response = await getVideogameAdapter(id)
    res.status(200).send(response)
  } catch (err) {

  }
}

