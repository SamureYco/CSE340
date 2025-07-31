const { body, validationResult } = require('express-validator');

const classificationRules = () => {
  return [
    body('classification_name')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Classification name is required.')
      .matches(/^[A-Za-z0-9]+$/)
      .withMessage('No spaces or special characters allowed.')
  ];
};

const checkClassificationData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('inventory/add-classification', {
      title: 'Add New Classification',
      message: null,
      errors: errors.array(),
    });
  }
  next();
};

module.exports = {
  classificationRules,
  checkClassificationData
};
