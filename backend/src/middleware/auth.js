const { verifyToken } = require('../utils/jwt');
const userModel = require('../models/userModel');
const AppError = require('../utils/appError');

async function verifyTokenMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new AppError('Authentication required', 401, 'UNAUTHENTICATED'));
  }

  try {
    const payload = verifyToken(token);
    const user = await userModel.findById(payload.sub);

    if (!user) {
      return next(new AppError('Authentication required', 401, 'UNAUTHENTICATED'));
    }

    req.user = userModel.toSafeUser(user);
    next();
  } catch (err) {
    next(new AppError('Invalid or expired token', 401, 'INVALID_TOKEN'));
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('Insufficient permissions', 403, 'FORBIDDEN'));
    }
    next();
  };
}

module.exports = { verifyToken: verifyTokenMiddleware, requireRole };
