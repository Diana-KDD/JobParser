import pool from "../config/db.js";

export async function addDLU(nameTable, date) {
  try {
    await pool.query(
      `INSERT INTO dates_Latest_Updates (id, name_table, date) VALUES ($1, $2, $3) ON CONFLICT (name_table) DO UPDATE SET date = EXCLUDED.date`,
      [crypto.randomUUID(), nameTable, date],
    );
  } catch (err) {
    console.error("Error while adding a date latest updates:", err.message);
    throw err;
  }
}
