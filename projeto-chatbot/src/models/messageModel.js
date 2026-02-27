import { pool } from "../config/db.js";


export async function createMessage(conversationId, content, role) {
  const result = await pool.query(
    `INSERT INTO messages (conversation_id, content, role)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [conversationId, content, role]
  );

  return result.rows[0];
}


export async function getMessages(conversationId) {
  const result = await pool.query(
    `SELECT * FROM messages
     WHERE conversation_id = $1
     ORDER BY created_at ASC`,
    [conversationId]
  );

  return result.rows;
}

export async function countMessages(conversationId) {
  const result = await pool.query(
    `SELECT COUNT(*) FROM messages
     WHERE conversation_id = $1`,
    [conversationId]
  );

  return parseInt(result.rows[0].count);
}