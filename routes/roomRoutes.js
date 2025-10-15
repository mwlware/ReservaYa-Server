const express = require('express');
const router = express.Router();
const { createRoom, getRooms, getRoomById, updateRoom, deleteRoom } = require('../controllers/roomController');

// Ruta para crear una nueva habitación
router.post('/rooms', createRoom);

// Ruta para obtener todas las habitaciones
router.get('/rooms', getRooms);

// Ruta para obtener una habitación específica
router.get('/rooms/:id', getRoomById);

// Ruta para actualizar una habitación
router.put('/rooms/:id', updateRoom);

// Ruta para eliminar una habitación
router.delete('/rooms/:id', deleteRoom);

module.exports = router; 