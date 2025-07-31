const invModel = require('../models/inventoryModel');
const utilities = require('../utilities/index');
const { validationResult } = require("express-validator");

/* Mostrar detalles del vehículo */
async function getVehicleDetail(req, res, next) {
  const invId = parseInt(req.params.invId);
  try {
    const data = await invModel.getVehicleById(invId);
    if (!data) {
      return next(); // 404
    }
    const html = utilities.buildVehicleDetailView(data);
    res.render('inventory/detail', {
      title: `${data.inv_make} ${data.inv_model}`,
      html
    });
  } catch (error) {
    next(error); // 500
  }
}

/* Vista principal de gestión */
async function buildManagementView(req, res, next) {
  try {
    const nav = await utilities.getNav();
    const data = await invModel.getAllInventory();
    res.render('inventory/management', {
      title: 'Inventory Management',
      nav,
      message: req.flash('message'),
      vehicles: data.rows
    });
  } catch (error) {
    next(error);
  }
}

/* Mostrar formulario de añadir vehículo */
async function showAddInventoryForm(req, res, next) {
  try {
    const nav = await utilities.getNav();
    const classificationList = await utilities.buildClassificationList();
    res.render('inventory/add-inventory', {
      title: 'Add New Vehicle',
      nav,
      classificationList,
      message: req.flash('message'),
      errors: null,
      // Sticky vacíos
      inv_make: "", inv_model: "", inv_year: "", inv_description: "",
      inv_image: "", inv_thumbnail: "", inv_price: "", inv_miles: "", inv_color: ""
    });
  } catch (error) {
    next(error);
  }
}

/* Procesar nuevo vehículo */
async function addInventory(req, res, next) {
  const {
    classification_id, inv_make, inv_model, inv_year,
    inv_description, inv_image, inv_thumbnail,
    inv_price, inv_miles, inv_color
  } = req.body;

  const errors = validationResult(req);
  const nav = await utilities.getNav();
  const classificationList = await utilities.buildClassificationList(classification_id);

  if (!errors.isEmpty()) {
    return res.render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationList,
      message: null,
      errors: errors.array(),
      inv_make, inv_model, inv_year, inv_description,
      inv_image, inv_thumbnail, inv_price, inv_miles, inv_color
    });
  }

  try {
    const result = await invModel.insertInventory({
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color
    });

    if (result) {
      req.flash('message', 'New vehicle added successfully.');
      res.redirect('/inv');
    } else {
      res.render('inventory/add-inventory', {
        title: 'Add New Vehicle',
        nav,
        classificationList,
        message: 'Failed to add vehicle.',
        errors: null,
        inv_make, inv_model, inv_year, inv_description,
        inv_image, inv_thumbnail, inv_price, inv_miles, inv_color
      });
    }
  } catch (error) {
    next(error);
  }
}
async function showAddClassificationForm(req, res, next) {
  try {
    const nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      message: req.flash("message"),
      errors: null,
      classification_name: "" // para formulario sticky
    });
  } catch (error) {
    next(error);
  }
}
async function addClassification(req, res, next) {
  const { classification_name } = req.body;

  const errors = validationResult(req);
  const nav = await utilities.getNav();

  if (!errors.isEmpty()) {
    return res.render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      message: null,
      errors: errors.array(),
      classification_name
    });
  }

  try {
    const result = await invModel.insertClassification(classification_name);

    if (result) {
      req.flash("message", "New classification added successfully.");
      res.redirect("/inv");
    } else {
      res.render("inventory/add-classification", {
        title: "Add New Classification",
        nav,
        message: "Failed to add classification.",
        errors: null,
        classification_name
      });
    }
  } catch (error) {
    next(error);
  }
}



module.exports = {
  getVehicleDetail,
  buildManagementView,
  showAddInventoryForm,
  addInventory,
  showAddClassificationForm,
  addClassification
};
