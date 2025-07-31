async function getVehicleById(id) {
  // Datos falsos para probar la vista
  return {
    inv_id: id,
    inv_make: 'Toyota',
    inv_model: 'Corolla',
    inv_year: 2021,
    inv_price: 22000,
    inv_miles: 30000,
    inv_color: 'Gray',
    inv_description: 'A comfortable and fuel-efficient sedan.',
    inv_image: 'https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_1280.jpg'
  };
}

module.exports = { getVehicleById };