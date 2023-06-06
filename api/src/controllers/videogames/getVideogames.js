const { getVideogamesAdapter } = require("#adapters")

module.exports = async (_, res) => {
  try {
    const response = await getVideogamesAdapter()
    res.status(200).send(response)
  } catch (error) {
    res.status(404).send({ error })
  }
}
