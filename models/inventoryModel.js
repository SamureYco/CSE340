const pool = require('../database'); // Asegúrate que tienes el archivo database/index.js con tu conexión

/** Obtener detalles de un vehículo por ID */
async function getVehicleById(id) {
  try {
    const result = await pool.query(
      'SELECT * FROM inventory WHERE inv_id = $1',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error getting vehicle by ID:', error);
    return null;
  }
}

/** Obtener todos los vehículos */
async function getAllInventory() {
  try {
    const result = await pool.query('SELECT * FROM inventory ORDER BY inv_make');
    return result;
  } catch (error) {
    console.error('Error getting all inventory:', error);
    return null;
  }
}

/** Insertar un nuevo vehículo en la base de datos */
async function insertInventory(vehicle) {
  try {
    const sql = `
      INSERT INTO inventory (
        classification_id,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    const values = [
      vehicle.classification_id,
      vehicle.inv_make,
      vehicle.inv_model,
      vehicle.inv_year,
      vehicle.inv_description,
      vehicle.inv_image,
      vehicle.inv_thumbnail,
      vehicle.inv_price,
      vehicle.inv_miles,
      vehicle.inv_color
    ];

    const result = await pool.query(sql, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error inserting inventory:', error);
    return null;
  }
}

module.exports = {
  getVehicleById,
  getAllInventory,
  insertInventory
};
