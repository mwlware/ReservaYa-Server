const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

// Definir rutas para las reservaciones
// definir rutas para agregar reservaciones
router.post('/reservaciones', formController.GuardarReservacion);
// definir ruta para mostrar todas las reservaciones
router.get('/reservaciones', formController.MostrarReservaciones);
// definir ruta para editar una eliminar una reservación
router.delete('/reservaciones/:id', formController.EliminarReservacion);
// definir ruta para editar una reservación
router.put('/reservaciones/:id', formController.EditarReservacion);

module.exports = router;