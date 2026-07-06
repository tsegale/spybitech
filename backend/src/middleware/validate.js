const AppError = require('../utils/appError');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

function isValidEmail(email) {
  return typeof email === 'string' && EMAIL_REGEX.test(email);
}

function isValidPassword(password) {
  return typeof password === 'string' && password.length >= MIN_PASSWORD_LENGTH;
}

function validateRegister(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return next(new AppError('Name is required', 400, 'VALIDATION_ERROR'));
  }
  if (!isValidEmail(email)) {
    return next(new AppError('A valid email is required', 400, 'VALIDATION_ERROR'));
  }
  if (!isValidPassword(password)) {
    return next(
      new AppError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`, 400, 'VALIDATION_ERROR')
    );
  }
  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!isValidEmail(email)) {
    return next(new AppError('A valid email is required', 400, 'VALIDATION_ERROR'));
  }
  if (!password || typeof password !== 'string') {
    return next(new AppError('Password is required', 400, 'VALIDATION_ERROR'));
  }
  next();
}

function validateForgotPassword(req, res, next) {
  const { email } = req.body;

  if (!isValidEmail(email)) {
    return next(new AppError('A valid email is required', 400, 'VALIDATION_ERROR'));
  }
  next();
}

function validateResetPassword(req, res, next) {
  const { token, new_password: newPassword } = req.body;

  if (!token || typeof token !== 'string') {
    return next(new AppError('Reset token is required', 400, 'VALIDATION_ERROR'));
  }
  if (!isValidPassword(newPassword)) {
    return next(
      new AppError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`, 400, 'VALIDATION_ERROR')
    );
  }
  next();
}

module.exports = {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
};
