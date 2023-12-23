import { Pool } from 'pg';

export default async function handler(req, res) {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  // 認証チェック
  if (!isAuthenticated(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

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

// 認証チェック関数（仮の例）
function isAuthenticated(req) {
  // ここに認証ロジックを実装する
  // 例: リクエストヘッダーから認証トークンを取得して検証する
  const token = req.headers.authorization;
  return token === process.env.EXPECTED_AUTH_TOKEN;
}
