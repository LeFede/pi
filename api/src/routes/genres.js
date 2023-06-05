const { Router } = require("express")
const { 
  getGenres 
} = require("#controllers")

const router = Router()

router.get("/", getGenres)

module.exports = router

