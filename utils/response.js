const response = (res, statusCode, status, data) => {
  res.status(statusCode).json({ status, data });
};

module.exports = response;
