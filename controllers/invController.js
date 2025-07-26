const invModel = require("../models/inventory-model");

async function buildById(req, res, next) {
  try {
    const inv_id = req.params.inv_id;
    const data = await invModel.getVehicleById(inv_id);

    if (!data) {
      return res.status(404).render("errors/error", {
        title: "Vehicle Not Found",
        message: "The requested vehicle could not be found.",
      });
    }

    res.render("inventory/detail", {
      title: `${data.inv_make} ${data.inv_model}`,
      vehicle: data,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { buildById };
