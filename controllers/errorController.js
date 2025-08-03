const errorController = {};

errorController.generateError = (req, res, next) => {
  const error = new Error("Intentional Server Error");
  error.status = 500;
  next(error);
};

module.exports = errorController;