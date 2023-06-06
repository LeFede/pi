import { useState } from 'react';
import './App.css';

const endpoint = process.env.REACT_APP_API_ENDPOINT

function App() {

  const [form, setForm] = useState({
    name: "",
    description: "",
    rating: 0.00,
    released: "",
    image: "",
    platforms: [
      "",
    ]
  })

  const getVideogames = async () => {
    const res = await fetch(`${endpoint}/videogames`)
    const data = await res.json()
    console.log(data)
  }

  const getVideogame = async () => {
    const res = await fetch(`${endpoint}/videogames/9671`)
    const data = await res.json()
    console.log(data)
  }

  const getVideogamesQuery = async () => {
    const res = await fetch(`${endpoint}/videogames/name?search=league+of+legends`)
    const data = await res.json()
    console.log(data)
  }

  //   const { name, description, rating, genres, released } = req.body
  const createVideogame = async () => {
    const res = await fetch(`${endpoint}/videogames`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Juego de prueba",
        description: "Descripcion de prueba",
        rating: 4.30,
        released: "2019-02-11",
        image: "https://media.rawg.io/media/games/120/1201a40e4364557b124392ee50317b99.jpg",
        platforms: [
          "Playstation 4",
        ]
      })
    })
    
    const data = await res.json()
    console.log(data)
  }

  const getGenres = async () => {
    const res = await fetch(`${endpoint}/genres`)
    const data = await res.json()

    console.log(data)
  }

  const handleGetVideogames = () => getVideogames()
  const handleGetVideogame = () => getVideogame()
  const handleGetVideogamesQuery = () => getVideogamesQuery()
  const handleCreateVideogame = () => createVideogame()
  const handleGetGenres = () => getGenres()

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const handleChange = (event) => {
    
  }

  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      <button name="getVideogames" onClick={handleGetVideogames}>getVideogames</button>
      <button name="getVideogame" onClick={handleGetVideogame}>getVideogame</button>
      <button name="getVideogamesQuery" onClick={handleGetVideogamesQuery}>getVideogamesQuery</button>
      <button name="getGenres" onClick={handleGetGenres}>handleGetGenres</button>

      <form onSubmit={handleSubmit}>

        <label htmlFor="name">NAME</label>
        <input 
          id="name"
          name="name" 
          onChange={handleChange}
          type="text" 
          value={form.name} 
        />

        <label htmlFor="description">DESCRIPTION</label>
        <input 
          id="description"
          name="description" 
          onChange={handleChange}
          type="text" 
          value={form.description} 
        />
        
        <label htmlFor="rating">RATING</label>
        <input 
          id="rating"
          name="rating" 
          onChange={handleChange}
          type="number" 
          value={form.rating} 
        />

        <label htmlFor="released">Released</label>
        <input 
          id="released"
          name="released" 
          onChange={handleChange}
          type="text" 
          value={form.released}
        />

        <label htmlFor="image">Image</label>
        <input 
          id="image"
          name="image" 
          onChange={handleChange}
          type="text" 
          value={form.image}
        />
        
        <fieldset>
          <legend>Platforms</legend> 

          <label htmlFor="playstation_4">Playstation 4</label>
          <input 
            id="playstation_4"
            name="playstation_4" 
            onChange={handleChange}
            type="checkbox" 
            value={form.platforms}
          />

          <label htmlFor="pc">Pc</label>
          <input 
            id="pc"
            name="pc" 
            onChange={handleChange}
            type="checkbox" 
            value={form.platforms}
          />

        
        </fieldset>

        <button type="submit" name="createVideogame" onClick={handleCreateVideogame}>createVideogame</button>

      </form>
    </div>
  );
}

export default App;
