import fs from "fs";
import pool from "./db.js";

const sql = fs.readFileSync(new URL("./init.sql", import.meta.url), "utf8");

(async () => {
  try {
    await pool.query(sql);
    console.log("✅ Migración ejecutada correctamente");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error migrando:", err);
    process.exit(1);
  }
})();