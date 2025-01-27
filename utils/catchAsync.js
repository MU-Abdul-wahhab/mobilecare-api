const appError = require("./appError");

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => next(new appError(error.message, 400)));
  };
};
