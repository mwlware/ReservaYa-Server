const connection = require('../config/db');

// Crear una nueva habitación
const createRoom = async (req, res) => {
  try {
    const { name, location, price, description, imageUrl, amenities } = req.body;
    
    // Validar que todos los campos requeridos estén presentes
    if (!name || !location || !price || !description || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    // Asegurarse de que amenities sea un array válido
    const amenitiesJson = Array.isArray(amenities) ? JSON.stringify(amenities) : '[]';
    
    const [result] = await connection.query(
      'INSERT INTO rooms (name, location, price, description, image_url, amenities) VALUES (?, ?, ?, ?, ?, ?)',
      [name, location, price, description, imageUrl, amenitiesJson]
    );

    res.status(201).json({
      success: true,
      message: 'Habitación creada exitosamente',
      roomId: result.insertId
    });
  } catch (error) {
    console.error('Error al crear habitación:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear la habitación',
      error: error.message
    });
  }
};

// Obtener todas las habitaciones
const getRooms = async (req, res) => {
  try {
    const [rooms] = await connection.query('SELECT * FROM rooms');
    
    // Convertir el string de amenities a array para cada habitación
    const formattedRooms = rooms.map(room => {
      let amenities = [];
      try {
        amenities = JSON.parse(room.amenities || '[]');
      } catch (e) {
        console.error('Error parsing amenities for room', room.id, e);
      }

      return {
        ...room,
        amenities,
        price: Number(room.price)
      };
    });

    res.json({
      success: true,
      data: formattedRooms
    });
  } catch (error) {
    console.error('Error al obtener habitaciones:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener las habitaciones',
      error: error.message
    });
  }
};

// Obtener una habitación por ID
const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rooms] = await connection.query('SELECT * FROM rooms WHERE id = ?', [id]);

    if (rooms.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Habitación no encontrada'
      });
    }

    const room = rooms[0];
    let amenities = [];
    try {
      amenities = JSON.parse(room.amenities || '[]');
    } catch (e) {
      console.error('Error parsing amenities for room', room.id, e);
    }

    res.json({
      success: true,
      data: {
        ...room,
        amenities,
        price: Number(room.price)
      }
    });
  } catch (error) {
    console.error('Error al obtener la habitación:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener la habitación',
      error: error.message
    });
  }
};

// Actualizar una habitación
const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, price, description, imageUrl, amenities } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!name || !location || !price || !description || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    // Verificar si la habitación existe
    const [existingRoom] = await connection.query('SELECT id FROM rooms WHERE id = ?', [id]);
    if (existingRoom.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Habitación no encontrada'
      });
    }

    // Asegurarse de que amenities sea un array válido
    const amenitiesJson = Array.isArray(amenities) ? JSON.stringify(amenities) : '[]';

    await connection.query(
      'UPDATE rooms SET name = ?, location = ?, price = ?, description = ?, image_url = ?, amenities = ? WHERE id = ?',
      [name, location, price, description, imageUrl, amenitiesJson, id]
    );

    res.json({
      success: true,
      message: 'Habitación actualizada exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar la habitación:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la habitación',
      error: error.message
    });
  }
};

// Eliminar una habitación
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si la habitación existe
    const [existingRoom] = await connection.query('SELECT id FROM rooms WHERE id = ?', [id]);
    if (existingRoom.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Habitación no encontrada'
      });
    }

    await connection.query('DELETE FROM rooms WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Habitación eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar la habitación:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la habitación',
      error: error.message
    });
  }
};

module.exports = {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom
}; 