import pool from "../config/db.js";

export async function addRole(title, slug, parent_slug) {
  try {
    await pool.query(
      `INSERT INTO roles (id, title, slug, parent_slug) VALUES ($1, $2, $3, $4) ON CONFLICT (slug) 
            DO UPDATE SET title = EXCLUDED.title`,
      [crypto.randomUUID(), title, slug, parent_slug],
    );
    return true;
  } catch (err) {
    console.error("Error while adding a role:", err.message);
    return false;
  }
}

export async function getRowsRole() {
  try {
    const { rows } = await pool.query("SELECT * FROM roles");
    return rows;
  } catch (err) {
    console.error("Error when getting rows roles:", err.message);
    throw err;
  }
}
