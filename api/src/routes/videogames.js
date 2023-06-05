const { Router } = require("express")
const { 
  getVideogames, 
  getVideogame, 
  getVideogamesQuery,
  createVideogame,
} = require("#controllers")

const router = Router()

router.get("/", getVideogames)
router.get("/name", getVideogamesQuery)
router.get("/:id", getVideogame)

router.post("/", createVideogame)

module.exports = router
