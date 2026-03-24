const express = require('express');
const app = express();
require('dotenv').config();
 
app.use(express.json());
 
const estudiantesRoutes = require('./src/routes/estudiantesRoutes');
const materiasRoutes = require('./src/routes/materiasRoutes');
 
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/materias', materiasRoutes);
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});