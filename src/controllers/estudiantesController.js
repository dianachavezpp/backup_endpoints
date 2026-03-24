const db = require('../../connection');

const getAll = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM estudiantes');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener estudiantes');
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM estudiantes WHERE id_estudiante = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Estudiante no encontrado');
    }
};

const insert = async (req, res) => {
    const { nombre, apellido, correo } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO estudiantes (nombre, apellido, correo) VALUES ($1, $2, $3) RETURNING *',
            [nombre, apellido, correo]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al insertar estudiante');
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo } = req.body;
    try {
        const result = await db.query(
            'UPDATE estudiantes SET nombre = $1, apellido = $2, correo = $3 WHERE id_estudiante = $4 RETURNING *',
            [nombre, apellido, correo, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar estudiante');
    }
};

const patch = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo } = req.body;
    try {
        if (nombre) await db.query('UPDATE estudiantes SET nombre = $1 WHERE id_estudiante = $2', [nombre, id]);
        if (apellido) await db.query('UPDATE estudiantes SET apellido = $1 WHERE id_estudiante = $2', [apellido, id]);
        if (correo) await db.query('UPDATE estudiantes SET correo = $1 WHERE id_estudiante = $2', [correo, id]);
        res.send('Estudiante actualizado parcialmente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar estudiante');
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM estudiantes WHERE id_estudiante = $1', [id]);
        res.send('Estudiante eliminado');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar estudiante');
    }
};

module.exports = { getAll, getById, insert, update, patch, remove };