const db = require('../db');  // Asegúrate de que este sea el archivo correcto de conexión

// Función para obtener vehículos
async function getVehicles() {
  const query = 'SELECT * FROM inventory'; // O tu consulta real
  const result = await db.query(query);
  return result.rows;
}

// Exporta las funciones del modelo
module.exports = {
  getVehicles,
  // Más funciones del modelo según sea necesario
};
