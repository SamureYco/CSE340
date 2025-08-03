const invModel = require("../models/inventory-model")
const { body, validationResult } = require("express-validator");
const Util = {}
const jwt = require("jsonwebtoken")
require("dotenv").config()


/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Homepage">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}

/* ***************************
 * Build vehicle detail HTML
 * ************************** */
Util.buildVehicleDetail = function(data, isInWishlist, loggedin) {
  if (!data) return "<p>Vehicle not found.</p>";

  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const price = formatter.format(data.inv_price);
  const mileage = new Intl.NumberFormat('en-US').format(data.inv_miles);

  // Wishlist button (only show if user is logged in)
  let wishlistButton = "";
  if (loggedin) {
    if (!isInWishlist) {
      wishlistButton = `
        <form action="/account/wishlist/add" method="POST">
          <input type="hidden" name="inv_id" value="${data.inv_id}">
          <button type="submit" class="btn">Add to Wishlist</button>
        </form>`;
    } else {
      wishlistButton = `
        <form action="/account/wishlist/remove" method="POST">
          <input type="hidden" name="inv_id" value="${data.inv_id}">
          <button type="submit" class="btn">Remove from Wishlist</button>
        </form>`;
    }
  }

  return `
    <div class="vehicle-detail">
      <img src="${data.inv_image}" alt="Image of ${data.inv_make} ${data.inv_model}">
      <div class="vehicle-info">
        <h1>${data.inv_make} ${data.inv_model}</h1>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Year:</strong> ${data.inv_year}</p>
        <p><strong>Mileage:</strong> ${mileage} miles</p>
        <p><strong>Description:</strong> ${data.inv_description}</p>
        <div class="vehicle-actions">
          ${wishlistButton}
      </div>
      </div>
    </div>
  `;
};



/* ***************************
 * Build Inventory View
 * ************************** */
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}

/* ******************************
 *  Inventory Data Validation Rules
 * ****************************** */
Util.newInventoryRules = () => {
  return [
      body("classification_id").notEmpty().withMessage("Please select a classification."),
      body("inv_make").trim().escape().notEmpty().withMessage("Please provide a make."),
      body("inv_model").trim().escape().notEmpty().withMessage("Please provide a model."),
      body("inv_year").isNumeric().withMessage("Please provide a valid year."),
      body("inv_description").trim().escape().notEmpty().withMessage("Please provide a description."),
      body("inv_image").trim().notEmpty().withMessage("Please provide an image path."),
      body("inv_thumbnail").trim().notEmpty().withMessage("Please provide a thumbnail path."),
      body("inv_price").isFloat({ min: 0 }).withMessage("Please provide a valid price."),
      body("inv_miles").isInt({ min: 0 }).withMessage("Please provide valid mileage."),
      body("inv_color").trim().escape().notEmpty().withMessage("Please provide a color."),
  ];
};

/* ******************************
*  Check Inventory Update Data
* ****************************** */
Util.checkUpdateData = async (req, res, next) => {
  const { inv_id, classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body;
  
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
      let nav = await Util.getNav();
      const classificationSelect = await Util.buildClassificationList(classification_id);

      return res.render("./inventory/edit-inventory", {
          title: `Edit ${inv_make} ${inv_model}`,
          nav,
          classificationSelect,
          errors: errors.array(),
          inv_id,
          classification_id,
          inv_make,
          inv_model,
          inv_year,
          inv_description,
          inv_image,
          inv_thumbnail,
          inv_price,
          inv_miles,
          inv_color,
      });
  }
  next();
};


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
}


/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
}

/* ****************************************
 *  Check if the user is an Employee or Admin
 **************************************** */
Util.checkAdmin = (req, res, next) => {
  if (!res.locals.loggedin || !res.locals.accountData) {
    req.flash("notice", "You must be logged in to access this page.");
    return res.redirect("/account/login");
  }

  // Only allow Employees and Admins
  if (res.locals.accountData.account_type === "Employee" || res.locals.accountData.account_type === "Admin") {
    next();
  } else {
    req.flash("notice", "Unauthorized access. Admin or Employee rights required.");
    return res.redirect("/account/login");
  }
};

module.exports = Util