import './App.css';
import { Form } from '#components';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addVideogames } from './redux/videogamesSlice'

import { clamp } from '#utils';

const endpoint = process.env.REACT_APP_API_ENDPOINT

const videogamesPerPage = 15

function App() {

  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(0)
  const dispatch = useDispatch()
  const {videogames} = useSelector((state) => state.videogames)

  const getVideogames = async () => {
    try { 
      const res = await fetch(`${endpoint}/videogames`)
      const videoGames = await res.json()
      dispatch(addVideogames(videoGames))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getVideogames()
  }, [])

  useEffect(() => {
    setTotalPages(~~(videogames.length / videogamesPerPage))
    console.log(videogames)
  }, [videogames])

  return (
    <div className="App">
      <Form/>
      <button type="" onClick={() => setPage(prev => clamp(prev+1, 0, totalPages))}>next</button>
      <button type="" onClick={() => setPage(prev => clamp(prev-1, 0, totalPages))}>previous</button>

      {
        Array.from({length: totalPages + 1}).map((e, i) => {
          return <button key={i} type="" onClick={() => setPage(prev => i)}>{i+1}</button>
        })
      }

      <div>
        {videogames
          .slice(0 + (page * videogamesPerPage),videogamesPerPage + (page * videogamesPerPage))
          .map(e => <div key={e.name}>{e.name}</div>)}
      </div>
    </div>
  )
}

export default App;

