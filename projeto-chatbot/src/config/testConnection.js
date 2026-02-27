import { pool } from "./db.js";

async function testDB() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log(" Banco conectado:", res.rows[0]);
  } catch (err) {
    console.error(" Erro no banco:", err);
  }
}

testDB();
