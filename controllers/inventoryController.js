const invModel = require('../models/inventoryModel');
const utils = require('../utilities/index');

async function getVehicleDetail(req, res, next) {
  const invId = parseInt(req.params.invId);
  try {
    const data = await invModel.getVehicleById(invId);
    if (!data) {
      return next(); // Genera un 404 si no se encuentra
    }
    const html = utils.buildVehicleDetailView(data);
    res.render('inventory/detail', { title: `${data.inv_make} ${data.inv_model}`, html });
  } catch (error) {
    next(error); // Manejo de error 500
  }
}

module.exports = { getVehicleDetail };