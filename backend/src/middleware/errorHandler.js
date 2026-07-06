const AppError = require('../utils/appError');

function notFoundHandler(req, res, next) {
  next(new AppError('Route not found', 404, 'NOT_FOUND'));
}

function errorHandler(err, req, res, next) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const code = err instanceof AppError ? err.code : 'INTERNAL_ERROR';
  const message = err instanceof AppError ? err.message : 'Something went wrong';

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({ error: { message, code } });
}

module.exports = { errorHandler, notFoundHandler };
