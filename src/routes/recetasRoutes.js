const express = require('express')
const router = express.Router()
const {
  getRecetas,
  getRecetaById,
  createReceta,
  updateReceta,
  deleteReceta
} = require('../controllers/recetasController')

router.get('/', getRecetas)
router.get('/:id', getRecetaById)
router.post('/', createReceta)
router.put('/:id', updateReceta)
router.delete('/:id', deleteReceta)

module.exports = router