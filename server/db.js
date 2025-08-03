const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL via DB_URL');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL error:', err.message);
});

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('📡 Ping success:', res.rows[0]);
  } catch (err) {
    console.error('❌ Ping query failed:', err.message);
  }
})();


module.exports = pool;
