import pool from "./db.js";

export default async function init() {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS dates_latest_updates(
          id text PRIMARY KEY,
          name_table text UNIQUE NOT NULL,
          date date NOT NULL
          )`,
    );
    await pool.query(
      `CREATE TABLE IF NOT EXISTS countries(
          country_code varchar(15) PRIMARY KEY,
          name text NOT NULL
          )`,
    );
    await pool.query(
      `CREATE TABLE IF NOT EXISTS roles(
          id text PRIMARY KEY,
          title text NOT NULL,
          slug text UNIQUE NOT NULL,
          parent_slug text
          )`,
    );
    console.log("The tables created");
  } catch (error) {
    console.error("The table of countries was not created", error.message);
  }
}
