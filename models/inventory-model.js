const pool = require("../database/connection"); // Ajusta si tu archivo se llama diferente

async function getVehicleById(inv_id) {
  try {
    const result = await pool.query(
      "SELECT * FROM public.inventory WHERE inv_id = $1",
      [inv_id]
    );
    return result.rows[0]; // Devuelve un solo vehículo
  } catch (error) {
    throw error;
  }
}

module.exports = { getVehicleById };
