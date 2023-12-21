import { Pool } from 'pg';

export default async function handler(req, res) {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    const { rows } = await pool.query('SELECT * FROM linebot_messages');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching data from database:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    pool.end();
  }
}
