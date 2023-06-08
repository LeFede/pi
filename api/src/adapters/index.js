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
  // ...genre
  id    : genre.id,
  name  : genre.name,
  slug  : genre.slug,
})

const ENDPOINTS = {
  games: `${API_URL}/games`,
  genres: `${API_URL}/genres`,
}

const getVideogamesAdapter = async () => {
  // const promises = [
  //   fetch(`${ENDPOINTS.games}?page_size=40&key=${API_KEY}`),
  //   fetch(`${ENDPOINTS.games}?page_size=40&key=${API_KEY}`),
  //   fetch(`${ENDPOINTS.games}?page_size=20&key=${API_KEY}`),
  // ]
  // const results = Promise.resolveAll(promises)
  // const { results: games } = await res.json()

  // return games.map(adaptedVideogame)

  // return []
  const promises = [
    fetch(`${ENDPOINTS.games}?page_size=20&key=${API_KEY}`),
    fetch(`${ENDPOINTS.games}?page_size=20&page=2&key=${API_KEY}`),
    fetch(`${ENDPOINTS.games}?page_size=20&page=3&key=${API_KEY}`),
    fetch(`${ENDPOINTS.games}?page_size=20&page=4&key=${API_KEY}`),
    fetch(`${ENDPOINTS.games}?page_size=20&page=5&key=${API_KEY}`),
  ]

  const results = await Promise.all(promises)
  const jsonPromises = results.map(e => e.json())
  let games = await Promise.all(jsonPromises)

  games = games.reduce((prev, curr) => {
    return [
      ...prev,
      ...curr.results
    ]
  }, [])

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
  
  // return genres
  return genres.map(adaptedGenre)
}

module.exports = {
  getVideogamesAdapter,
  getVideogameAdapter,
  getVideogamesQueryAdapter,
  getGenresAdapter,
} 
