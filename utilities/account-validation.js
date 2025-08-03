const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
validate.registationRules = () => {
    return [
      // firstname is required and must be string
      body("account_firstname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a first name."), // on error this message is sent.
  
      // lastname is required and must be string
      body("account_lastname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a last name."), // on error this message is sent.
  
      // valid email is required and cannot already exist in the DB
      body("account_email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage("A valid email is required."),
  
      // password is required and must be strong password
      body("account_password")
        .trim()
        .notEmpty()
        .isStrongPassword({
          minLength: 12,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
        .withMessage("Password does not meet requirements."),
    ]
}

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("account/register", {
        errors,
        title: "Registration",
        nav,
        account_firstname,
        account_lastname,
        account_email,
      })
      return
    }
    next()
  }


  /* ******************************
 * Login Validation Rules
 * ***************************** */
validate.loginRules = () => {
  return [
    body("account_email")
      .trim()
      .isEmail()
      .withMessage("A valid email is required."),

    body("account_password")
      .trim()
      .notEmpty()
      .withMessage("Password is required."),
  ];
};

/* ******************************
 * Check login data and return errors or continue
 * ***************************** */
validate.checkLoginData = async (req, res, next) => {
  const { account_email } = req.body;
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("account/login", {
      errors,
      title: "Login",
      nav,
      account_email,
    });
    return;
  }
  next();
};
  
/* ***************************
 *  Validation Rules for Updating Account
 * ************************** */
validate.updateAccountRules = () => {
  return [
      body("account_firstname").trim().notEmpty().withMessage("First name is required."),
      body("account_lastname").trim().notEmpty().withMessage("Last name is required."),
      body("account_email").trim().isEmail().withMessage("Valid email is required."),
  ];
};

/* ***************************
*  Validate Account Update Data
* ************************** */
validate.checkUpdateData = async (req, res, next) => {
  const { account_firstname, account_lastname, account_email, account_id } = req.body;
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
      let nav = await utilities.getNav();
      res.status(400).render("account/update", {
          title: "Update Account",
          nav,
          errors,
          account_firstname,
          account_lastname,
          account_email,
          account_id
      });
      return;
  }
  next();
};

/* ***************************
*  Validate Password Update
* ************************** */
validate.passwordRules = () => {
  return [
      body("account_password").trim().isStrongPassword({
          minLength: 12,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
      }).withMessage("Password does not meet requirements."),
  ];
};

/* ***************************
*  Validate Password Update Data
* ************************** */
validate.checkPasswordUpdate = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
      req.flash("notice", "Invalid password format.");
      return res.redirect(`/account/update/${req.body.account_id}`);
  }
  next();
};


 module.exports = validate