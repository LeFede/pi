const { getGenresAdapter } = require("#adapters")

module.exports = async (req, res) => {
  try {
    const response = await getGenresAdapter()
    res.status(200).send(response)
  } catch (err) {

  }
}
