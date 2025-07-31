const { body, validationResult } = require("express-validator")

// ---------- Reglas para clasificación ----------
const classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Classification name is required.")
      .matches(/^[A-Za-z0-9]+$/)
      .withMessage("No spaces or special characters allowed.")
  ]
}

const checkClassificationData = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render("inventory/add-classification", {
      title: "Add New Classification",
      message: null,
      errors: errors.array(),
      classification_name: req.body.classification_name
    })
  }
  next()
}

// ---------- Reglas para inventario ----------
const inventoryRules = () => {
  return [
    body("inv_make").trim().notEmpty().withMessage("Make is required."),
    body("inv_model").trim().notEmpty().withMessage("Model is required."),
    body("inv_year").trim().isInt({ min: 1900, max: 2100 }).withMessage("Valid year is required."),
    body("inv_description").trim().notEmpty().withMessage("Description is required."),
    body("inv_image").trim().notEmpty().withMessage("Image path is required."),
    body("inv_thumbnail").trim().notEmpty().withMessage("Thumbnail path is required."),
    body("inv_price").trim().isFloat({ min: 0 }).withMessage("Valid price is required."),
    body("inv_miles").trim().isInt({ min: 0 }).withMessage("Valid mileage is required."),
    body("inv_color").trim().notEmpty().withMessage("Color is required."),
    body("classification_id").trim().notEmpty().withMessage("Classification is required.")
  ]
}

const checkInventoryData = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const utilities = require("../utilities/index")
    const invModel = require("../models/inventoryModel")

    Promise.all([
      utilities.getNav(),
      utilities.buildClassificationList(req.body.classification_id)
    ]).then(([nav, classificationList]) => {
      res.render("inventory/add-inventory", {
        title: "Add New Vehicle",
        nav,
        classificationList,
        message: null,
        errors: errors.array(),
        inv_make: req.body.inv_make,
        inv_model: req.body.inv_model,
        inv_year: req.body.inv_year,
        inv_description: req.body.inv_description,
        inv_image: req.body.inv_image,
        inv_thumbnail: req.body.inv_thumbnail,
        inv_price: req.body.inv_price,
        inv_miles: req.body.inv_miles,
        inv_color: req.body.inv_color
      })
    }).catch(err => next(err))
  } else {
    next()
  }
}

module.exports = {
  classificationRules,
  checkClassificationData,
  inventoryRules,
  checkInventoryData
}
