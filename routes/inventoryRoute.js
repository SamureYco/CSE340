const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const invValidation = require('../middleware/inventoryValidation');

// Vista principal de gestión de inventario
router.get('/', inventoryController.buildManagementView);

// -----------------------------
// Mostrar detalle de vehículo
router.get('/detail/:invId', inventoryController.getVehicleDetail);

// -----------------------------
// Clasificación
router.get('/add-classification', inventoryController.showAddClassificationForm);

router.post(
  '/add-classification',
  invValidation.classificationRules(),
  invValidation.checkClassificationData,
  inventoryController.addClassification
);

// -----------------------------
// Inventario
router.get('/add-inventory', inventoryController.showAddInventoryForm);

router.post(
  '/add-inventory',
  invValidation.inventoryRules(),
  invValidation.checkInventoryData,
  inventoryController.addInventory
);

// -----------------------------
// Error intencional (para Task 3 de Assignment 3)
router.get('/trigger-error', (req, res) => {
  throw new Error("Intentional error triggered!");
});

module.exports = router;
