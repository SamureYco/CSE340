const vehicles = [
  {
    inv_id: "1",
    inv_make: "Toyota",
    inv_model: "Corolla",
    inv_year: 2022,
    inv_description: "A reliable car.",
    inv_price: 20000,
    inv_miles: 10000,
    inv_color: "Blue",
    inv_image: "/images/toyota-corolla.jpg"
  },
  {
    inv_id: "2",
    inv_make: "Honda",
    inv_model: "Civic",
    inv_year: 2023,
    inv_description: "Efficient and modern.",
    inv_price: 22000,
    inv_miles: 5000,
    inv_color: "Red",
    inv_image: "/images/honda-civic.jpg"
  }
];

async function getVehicleById(id) {
  return vehicles.find(v => v.inv_id === id);
}

module.exports = { getVehicleById };
