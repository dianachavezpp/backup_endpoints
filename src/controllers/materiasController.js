const db = require('../../connection');

const getAll = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM materias');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener materias');
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM materias WHERE id_materia = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Materia no encontrada');
    }
};

const insert = async (req, res) => {
    const { nombre, creditos, profesor } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO materias (nombre, creditos, profesor) VALUES ($1, $2, $3) RETURNING *',
            [nombre, creditos, profesor]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al insertar materia');
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { nombre, creditos, profesor } = req.body;
    try {
        const result = await db.query(
            'UPDATE materias SET nombre = $1, creditos = $2, profesor = $3 WHERE id_materia = $4 RETURNING *',
            [nombre, creditos, profesor, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar materia');
    }
};

const patch = async (req, res) => {
    const { id } = req.params;
    const { nombre, creditos, profesor } = req.body;
    try {
        if (nombre) await db.query('UPDATE materias SET nombre = $1 WHERE id_materia = $2', [nombre, id]);
        if (creditos) await db.query('UPDATE materias SET creditos = $1 WHERE id_materia = $2', [creditos, id]);
        if (profesor) await db.query('UPDATE materias SET profesor = $1 WHERE id_materia = $2', [profesor, id]);
        res.send('Materia actualizada parcialmente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar materia');
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM materias WHERE id_materia = $1', [id]);
        res.send('Materia eliminada');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar materia');
    }
};

module.exports = { getAll, getById, insert, update, patch, remove };