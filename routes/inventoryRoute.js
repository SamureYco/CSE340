//	Define la ruta /inventory/detail/:inv_id
const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");

// Ruta para mostrar los detalles de un vehículo
router.get("/detail/:inv_id", invController.buildDetailView);

module.exports = router;
