const invModel = require("../models/inventory-model");

async function buildDetailView(req, res, next) {
  try {
    const invId = req.params.inv_id;
    const vehicle = await invModel.getVehicleById(invId);

    if (!vehicle) {
      return res.status(404).render("errors/error", {
        title: "Vehicle Not Found",
        message: "Sorry, we couldn't find that vehicle.",
      });
    }

    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      vehicle,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { buildDetailView };
