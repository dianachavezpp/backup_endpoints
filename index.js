const express = require('express')
const cors = require('cors')
require('dotenv').config()

const categoriasRoutes = require('./src/routes/categoriasRoutes')
const recetasRoutes = require('./src/routes/recetasRoutes')

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/categorias', categoriasRoutes)
app.use('/api/recetas', recetasRoutes)

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: '🧁 Sweet Crumbs API funcionando!' })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`)
})