// ~ TODO: adapters folder should be place for ONLY the functions
// that process the endpoint object and return de adapted object.
// See if the other functions should work as given here or should
// do something different, or be in a different place.

const { API_KEY, API_URL } = process.env

const adaptedVideogame = (game) => ({
  name        : game.name,
  id          : game.id,
  genres      : game.genres,
  platforms   : game.platforms,
  image       : game.background_image,
  released    : game.released,
  rating      : game.rating,
}) 

const adaptedGenre = (genre) => ({
  id    : genre.id,
  name  : genre.name,
})

const ENDPOINTS = {
  games: `${API_URL}/games`,
  genres: `${API_URL}/genres`,
}

const getVideogamesAdapter = async () => {
  const res  = await fetch(`${ENDPOINTS.games}?key=${API_KEY}`)
  const { results: games } = await res.json()

  return games.map(adaptedVideogame)
}

const getVideogameAdapter = async (gameId) => {
  const res  = await fetch(`${ENDPOINTS.games}/${gameId}?key=${API_KEY}`)
  const game = await res.json()

  return adaptedVideogame(game)
}

const getVideogamesQueryAdapter = async (gameName) => {
  const res  = await fetch(`${ENDPOINTS.games}?search=${gameName}&key=${API_KEY}`)
  const { results: games } = await res.json()
  
  // TODO: limit to 15
  return games.map(adaptedVideogame)
}

const getGenresAdapter = async () => {
  const res = await fetch(`${ENDPOINTS.genres}?key=${API_KEY}`)
  const { results: genres } = await res.json()

  return genres.map(adaptedGenre)
}

module.exports = {
  getVideogamesAdapter,
  getVideogameAdapter,
  getVideogamesQueryAdapter,
  getGenresAdapter,
} 
