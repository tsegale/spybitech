const crypto = require('crypto');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const { signToken } = require('../utils/jwt');
const { sendPasswordResetEmail } = require('../utils/email');
const AppError = require('../utils/appError');
const env = require('../config/env');

const SALT_ROUNDS = 10;
const RESET_TOKEN_BYTES = 32;
const RESET_TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

function issueToken(user) {
  return signToken({ sub: user.id, role: user.role });
}

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const existing = await userModel.findByEmail(email);
    if (existing) {
      return next(new AppError('An account with this email already exists', 409, 'EMAIL_IN_USE'));
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await userModel.create({ name, email, passwordHash });
    const token = issueToken(user);

    res.status(201).json({ user: userModel.toSafeUser(user), token });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findByEmail(email);
    const invalidCredentialsError = new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');

    if (!user) {
      return next(invalidCredentialsError);
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatches) {
      return next(invalidCredentialsError);
    }

    const token = issueToken(user);
    res.json({ user: userModel.toSafeUser(user), token });
  } catch (err) {
    next(err);
  }
}

async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const genericMessage = 'If an account with that email exists, a reset link has been sent.';

    const user = await userModel.findByEmail(email);

    if (user) {
      const resetToken = crypto.randomBytes(RESET_TOKEN_BYTES).toString('hex');
      const resetTokenExpires = new Date(Date.now() + RESET_TOKEN_EXPIRY_MS);

      await userModel.setResetToken(user.id, resetToken, resetTokenExpires);

      const baseUrl = env.allowedOrigins[0] || 'http://localhost:3000';
      const resetLink = `${baseUrl}/reset-password?token=${resetToken}`;
      await sendPasswordResetEmail(user.email, resetLink);
    }

    res.json({ message: genericMessage });
  } catch (err) {
    next(err);
  }
}

async function resetPassword(req, res, next) {
  try {
    const { token, new_password: newPassword } = req.body;

    const user = await userModel.findByResetToken(token);
    const invalidTokenError = new AppError('Invalid or expired reset token', 400, 'INVALID_RESET_TOKEN');

    if (!user || !user.reset_token_expires || new Date(user.reset_token_expires) < new Date()) {
      return next(invalidTokenError);
    }

    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await userModel.updatePasswordAndClearToken(user.id, passwordHash);

    res.json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    res.json({ user: req.user });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, forgotPassword, resetPassword, me };
