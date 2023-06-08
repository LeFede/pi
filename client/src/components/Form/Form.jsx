import { useEffect, useState } from 'react';
import { addSingleVideogame } from "#redux"
import { useDispatch } from "react-redux";

const endpoint = process.env.REACT_APP_API_ENDPOINT

const initialForm = {
    description : "",
    image       : "",
    name        : "",
    platforms   : [],
    rating      : 0.00,
    released    : "",
}

export const Form = () => {

  const dispatch = useDispatch()

  const [platforms, setPlatforms] = useState([])

  const [form, setForm] = useState(initialForm)

  const getVideogames = async () => {
    try {
      const res = await fetch(`${endpoint}/videogames`)
      const videoGames = await res.json()
      console.log(videoGames)
    } catch (error) {
      console.log(error)
    }
  }

  const getVideogame = async () => {
    try {
      const res = await fetch(`${endpoint}/videogames/9671`)
      const foundVideogame = await res.json()
      console.log(foundVideogame)
    } catch (error) {
      console.log(error)
    }
  }

  const getVideogamesQuery = async () => {
    const res = await fetch(`${endpoint}/videogames/name?search=league+of+legends`)
    const videoGames = await res.json()
    console.log(videoGames)
  }

  //   const { name, description, rating, genres, released } = req.body
  const createVideogame = async () => {
    try {
      const res = await fetch(`${endpoint}/videogames`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          description : form.description,
          image       : form.image,
          name        : form.name,
          platforms   : form.platforms,
          rating      : form.rating,
          released    : form.released,
        })
      })
      
      const newVideogame = await res.json()

      console.log(newVideogame)

      dispatch(addSingleVideogame(newVideogame.message))

    } catch (error) {
      console.log(error)
    }
  }

  const getGenres = async () => {
    try {
      const res = await fetch(`${endpoint}/genres`)
      const genres = await res.json()
      setPlatforms(genres)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateVideogame     = () => createVideogame()
  const handleGetGenres           = () => getGenres()
  const handleGetVideogame        = () => getVideogame()
  const handleGetVideogames       = () => getVideogames()
  const handleGetVideogamesQuery  = () => getVideogamesQuery()

  const handleSubmit = (event) => {
    event.preventDefault()
    setForm(initialForm)
    console.log(form)
  }

  const handleChange = (event) => {
    const { value, name } = event.target
    setForm(prev => {
      return {
        ...prev, 
        [name]: value
      }
    })
  }

  useEffect(() => {
    getGenres()
  }, [])

  const handleChecked = (id) => {
    return form.platforms.includes(`${id}`)
  }

  const handlePlatforms = (event) => {
    const { name } = event.target
    if (form.platforms.includes(name)) {
      return setForm(prev => {
        const newPlatforms = prev.platforms.filter(platform => platform !== name)
        return {
          ...prev, 
          platforms: newPlatforms
        }
      })
    }

    setForm(prev => ({
      ...prev,
      platforms: [...prev.platforms, name]
    }))
  }

  const renderPlatforms = () => platforms.map(({id, name, slug}, i) => {
    return (
      <div key={i}>
        <label htmlFor={`id-${id}`}>{name}</label>
        <input checked={handleChecked(id)} onChange={handlePlatforms} id={`id-${id}`} type="checkbox" name={id} value={name}/>
      </div>
    )
  })
  
  const renderFields = () => Object.keys(form).map((field, i) => {
    let obj = {
      description : "text",
      image       : "text",
      name        : "text",
      rating      : "number",
      released    : "text",
    }
    let type = obj[field]
    if (type == null) return
    return (
      <div key={i}>
        <label htmlFor={field}>{field}</label>
        <input 
          id={field}
          name={field} 
          onChange={handleChange}
          type={type} 
          value={form[field]} 
        />
      </div>
    )
  })

  
  return (
    <form onSubmit={handleSubmit}>

      {renderFields()}
      
      <fieldset>
        <legend>Platforms</legend> 

        {renderPlatforms()}

      </fieldset>

      <button type="submit" name="createVideogame" onClick={handleCreateVideogame}>createVideogame</button>

    </form>
  )
}


      // <h1>Henry Videogames</h1>
      // <button name="getVideogames" onClick={handleGetVideogames}>getVideogames</button>
      // <button name="getVideogame" onClick={handleGetVideogame}>getVideogame</button>
      // <button name="getVideogamesQuery" onClick={handleGetVideogamesQuery}>getVideogamesQuery</button>
      // <button name="getGenres" onClick={handleGetGenres}>handleGetGenres</button>
