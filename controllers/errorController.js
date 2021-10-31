const AppError = require('./../utils/appError');

const dupFieldsErrorHandler = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Please enter another value the ${value} is duplicated`;
  return new AppError(message, 400);
};
const validationErrorHandler = (err) => {
  const value = err.message.split(':').pop();
  const message = `Something wrong happened because ${value} or it was entered incorrectly `;
  return new AppError(message, 400);
};

const sendError = (err, req, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (err.code === 11000) err = dupFieldsErrorHandler(err);
  if (err.name === 'ValidationError') err = validationErrorHandler(err);
  sendError(err, req, res);
};
