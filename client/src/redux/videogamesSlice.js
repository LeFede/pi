import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videogames: []
}

export const videogamesSlice = createSlice({
  name: "videogames",
  initialState,
  reducers: {
    addVideogames: (state, action) => {
      const { payload: videogames } = action
      state.videogames = videogames
    },
    addSingleVideogame: (state, action) => {
      const { payload: newVideogame } = action
      state.videogames.push(newVideogame)
    },
  }
})

export const { addVideogames, addSingleVideogame } = videogamesSlice.actions
export default videogamesSlice.reducer
