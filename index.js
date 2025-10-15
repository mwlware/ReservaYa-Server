const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');
const roomRoutes = require('./routes/roomRoutes');

// Crear la aplicación Express
const app = express();

dotenv.config();

// Middleware de logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Configuración de CORS
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Definir rutas
app.use('/api', formRoutes);
app.use('/api', roomRoutes);

// Middleware para el error 404
app.use((err, req, res, next) => {
    console.error('Error:', err);
    next(err);
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    console.log(`404 - Ruta no encontrada: ${req.method} ${req.path}`);
    res.status(404).json({ 
      error: 'Not Found', 
      path: req.path,
      method: req.method 
    });
});

// Definir el puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
