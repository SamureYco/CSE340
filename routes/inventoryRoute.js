const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/detail/:invId', inventoryController.getVehicleDetail);

module.exports = router;
router.get('/trigger-error', (req, res) => {
  throw new Error("Intentional error triggered!");
});