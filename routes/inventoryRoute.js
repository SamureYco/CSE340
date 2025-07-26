// routes/inventoryRoute.js

const express = require('express');
const router = express.Router();
const invController = require('../controllers/invController');  // Controlador de inventario

// Ruta para la vista de gestión
router.get('/management', invController.managementView);

// Ruta para agregar clasificación
router.get('/add-classification', invController.addClassificationView);

// Ruta para agregar inventario
router.get('/add-inventory', invController.addInventoryView);

// Ruta para ver los detalles de un vehículo
router.get('/detail/:id', invController.viewVehicleDetail);

// Exporta el router para usarlo en el archivo principal
module.exports = router;
