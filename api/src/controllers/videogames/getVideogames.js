const { getVideogamesAdapter } = require("#adapters")

module.exports = async (_, res) => {
  try {
    const response = await getVideogamesAdapter()
    console.log(response)
    res.status(200).send(response)
  } catch (err) {

  }
}
