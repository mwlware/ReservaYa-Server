const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}).promise();

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error en la conexión con la base de datos:', err);
    return;
  }
  console.log('Conexión con la base de datos establecida.');
  connection.release(); // Liberar la conexión después de usarla
});

module.exports = pool;
