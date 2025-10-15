const connection = require('../config/db');

// Crear nueva reservación
const GuardarReservacion = async (req, res) => {
  const { guestName, guestEmail, guestPhone, guestAddress, name, location, price, checkIn, checkOut, nights, guestDocument, guestDocument1 } = req.body;
  const totalCost = nights * price;

  try {
    const [results] = await connection.query(
      `INSERT INTO reservaciones (guestName, guestEmail, guestPhone, guestAddress, name, location, price, checkIn, checkOut, nights, totalCost, guestDocument, guestDocument1) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [guestName, guestEmail, guestPhone, guestAddress, name, location, price, checkIn, checkOut, nights, totalCost,guestDocument, guestDocument1]
    );

    res.status(201).json({
      success: true,
      data: { id: results.insertId, ...req.body, totalCost },
      message: 'Reservación creada exitosamente',
    });
  } catch (error) {
    console.error('Error al guardar reservación:', error);
    res.status(500).json({ success: false, message: 'Error al guardar reservación.', error: error.message });
  }
};

// Mostrar todas las reservaciones
const MostrarReservaciones = async (req, res) => {
  try {
    const [results] = await connection.query('SELECT * FROM reservaciones');
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error('Error al mostrar reservaciones:', error);
    res.status(500).json({ success: false, message: 'Error al mostrar reservaciones.', error: error.message });
  }
};

// Eliminar reservación
const EliminarReservacion = async (req, res) => {
  const { id } = req.params;

  try {
    await connection.query('DELETE FROM reservaciones WHERE id = ?', [id]);
    res.status(200).json({ success: true, message: 'Reservación eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar reservación:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar reservación.', error: error.message });
  }
};

// Editar reservación
const EditarReservacion = async (req, res) => {
  const { id } = req.params;
  const { guestName, guestEmail, guestPhone, guestAddress, name, location, price, checkIn, checkOut, nights, guestDocument, guestDocument1 } = req.body;
  const totalCost = nights * price;

  try {
    await connection.query(
      `UPDATE reservaciones SET 
        guestName = ?, 
        guestEmail = ?, 
        guestPhone = ?, 
        guestAddress = ?, 
        name = ?, 
        location = ?, 
        price = ?, 
        checkIn = ?, 
        checkOut = ?, 
        nights = ?, 
        guestDocument = ?, 
        guestDocument1 = ?, 
        totalCost = ? 
        WHERE id = ?`,
      [
        guestName, 
        guestEmail, 
        guestPhone, 
        guestAddress, 
        name, 
        location, 
        price, 
        checkIn, 
        checkOut, 
        nights, 
        guestDocument, 
        guestDocument1,
        totalCost, 
        id
      ]
    );

    res.status(200).json({
      success: true,
      message: 'Reservación actualizada exitosamente',
      data: {
        id,
        guestName,
        guestEmail,
        guestPhone,
        guestAddress,
        name,
        location,
        price,
        checkIn,
        checkOut,
        nights,
        guestDocument,
        guestDocument1,
        totalCost
      }
    });
  } catch (error) {
    console.error('Error al actualizar reservación:', error);
    res.status(500).json({ success: false, message: 'Error al actualizar reservación.', error: error.message });
  }
};

module.exports = {
  GuardarReservacion,
  MostrarReservaciones,
  EliminarReservacion,
  EditarReservacion
};