// controllers/invController.js

// Método para la vista de gestión
exports.managementView = (req, res) => {
  res.render('inventory/management', { title: 'Inventory Management' });
};

// Método para agregar clasificación
exports.addClassificationView = (req, res) => {
  res.render('inventory/add-classification', { title: 'Add Classification' });
};

// Método para agregar inventario
exports.addInventoryView = (req, res) => {
  res.render('inventory/add-inventory', { title: 'Add Inventory' });
};

// Método para ver detalles de un vehículo
exports.viewVehicleDetail = (req, res) => {
  const vehicleId = req.params.id;
  // Simula la búsqueda de un vehículo. En la práctica, deberías buscarlo en la base de datos.
  const vehicle = { inv_id: vehicleId, inv_make: 'Toyota', inv_model: 'Corolla' };
  
  if (vehicle) {
    res.render('inventory/detail', { title: 'Vehicle Details', vehicle });
  } else {
    res.status(404).send('Vehicle not found');
  }
};
