// pages/api/data.js
import { Pool } from 'pg'; // PostgreSQLを使う場合

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // 環境変数からデータベース接続情報を取得
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  try {
    const { rows } = await pool.query('SELECT * FROM linebot_messages'); // あなたのデータベースのクエリ
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
