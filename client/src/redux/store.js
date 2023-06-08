import { configureStore } from "@reduxjs/toolkit"
import videogamesReducer from "./videogamesSlice"

export const store = configureStore({
  reducer: {
    videogames: videogamesReducer,
  }
})
