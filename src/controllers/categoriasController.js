const pool = require('../models/connection')

// GET - Obtener todas las categorias
const getCategorias = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categorias ORDER BY id ASC')
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET - Obtener una categoria por ID
const getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM categorias WHERE id = $1', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Categoria no encontrada' })
    }
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST - Crear nueva categoria
const createCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body
    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es obligatorio' })
    }
    const result = await pool.query(
      'INSERT INTO categorias (nombre, descripcion) VALUES ($1, $2) RETURNING *',
      [nombre, descripcion]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// PUT - Actualizar categoria
const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, descripcion } = req.body
    const result = await pool.query(
      'UPDATE categorias SET nombre=$1, descripcion=$2 WHERE id=$3 RETURNING *',
      [nombre, descripcion, id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Categoria no encontrada' })
    }
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// DELETE - Eliminar categoria
const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM categorias WHERE id=$1 RETURNING *', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Categoria no encontrada' })
    }
    res.json({ message: 'Categoria eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { getCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria }