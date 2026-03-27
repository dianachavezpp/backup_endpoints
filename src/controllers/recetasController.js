const pool = require('../models/connection')


const getRecetas = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.*, c.nombre as categoria_nombre 
      FROM recetas r 
      LEFT JOIN categorias c ON r.categoria_id = c.id 
      ORDER BY r.id ASC
    `)
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getRecetaById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(`
      SELECT r.*, c.nombre as categoria_nombre 
      FROM recetas r 
      LEFT JOIN categorias c ON r.categoria_id = c.id 
      WHERE r.id = $1
    `, [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Receta no encontrada' })
    }
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


const createReceta = async (req, res) => {
  try {
    const { nombre, descripcion, ingredientes, instrucciones, categoria_id, tiempo_preparacion, dificultad } = req.body
    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es obligatorio' })
    }
    const result = await pool.query(
      `INSERT INTO recetas 
        (nombre, descripcion, ingredientes, instrucciones, categoria_id, tiempo_preparacion, dificultad) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nombre, descripcion, ingredientes, instrucciones, categoria_id, tiempo_preparacion, dificultad]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


const updateReceta = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, descripcion, ingredientes, instrucciones, categoria_id, tiempo_preparacion, dificultad } = req.body
    const result = await pool.query(
      `UPDATE recetas SET 
        nombre=$1, descripcion=$2, ingredientes=$3, instrucciones=$4, 
        categoria_id=$5, tiempo_preparacion=$6, dificultad=$7 
       WHERE id=$8 RETURNING *`,
      [nombre, descripcion, ingredientes, instrucciones, categoria_id, tiempo_preparacion, dificultad, id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Receta no encontrada' })
    }
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


const deleteReceta = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM recetas WHERE id=$1 RETURNING *', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Receta no encontrada' })
    }
    res.json({ message: 'Receta eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { getRecetas, getRecetaById, createReceta, updateReceta, deleteReceta }