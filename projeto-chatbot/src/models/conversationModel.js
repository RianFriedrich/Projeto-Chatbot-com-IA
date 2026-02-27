import { pool } from "../config/db.js";

export async function createConversation() {
  const result = await pool.query(
    "INSERT INTO conversations DEFAULT VALUES RETURNING *"
  );
  return result.rows[0];
}

export async function getAllConversations() {
  const result = await pool.query(
    "SELECT * FROM conversations ORDER BY created_at DESC"
  );
  return result.rows;
}

export async function deleteOldestConversation() {
  await pool.query(`
    DELETE FROM conversations
    WHERE id = (
      SELECT id FROM conversations
      ORDER BY created_at ASC
      LIMIT 1
    )
  `);
}