const pool = require("./database");

(async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Conectado correctamente:", result.rows[0]);
  } catch (err) {
    console.error("❌ Error de conexión:", err);
  } finally {
    process.exit();
  }
})();