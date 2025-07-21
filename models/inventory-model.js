// Este archivo simula una base de datos

async function getVehicleById(inv_id) {
  // Simulamos algunos vehículos
  const inventory = [
    {
      inv_id: 1,
      inv_make: "Toyota",
      inv_model: "Corolla",
      inv_year: 2020,
      inv_price: 18999,
      inv_miles: 30250,
      inv_description: "A reliable, fuel-efficient compact sedan.",
      inv_image: "/images/vehicles/toyota-corolla.jpg"
    },
    {
      inv_id: 2,
      inv_make: "Honda",
      inv_model: "Civic",
      inv_year: 2019,
      inv_price: 17500,
      inv_miles: 42000,
      inv_description: "Sporty and practical, with a modern look.",
      inv_image: "/images/vehicles/honda-civic.jpg"
    }
  ];

  const vehicle = inventory.find((v) => v.inv_id == inv_id);
  return vehicle;
}

module.exports = { getVehicleById };
