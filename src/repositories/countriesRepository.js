import pool from "../config/db.js";

export async function addCountry(country_code, name) {
  try {
    await pool.query(
      `INSERT INTO countries (country_code, name) VALUES ($1, $2) ON CONFLICT (country_code) DO UPDATE SET name = EXCLUDED.name`,
      [country_code, name],
    );
    return true;
  } catch (err) {
    console.error("Error when adding a country:", err.message);
    return false;
  }
}
