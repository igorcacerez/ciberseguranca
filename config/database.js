require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ethical_hacker_game',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log('[DB] Conexão com MySQL estabelecida com sucesso.');
    conn.release();
  } catch (err) {
    console.error('[DB] Erro ao conectar ao MySQL:', err.message);
    process.exit(1);
  }
}

module.exports = { pool, testConnection };
