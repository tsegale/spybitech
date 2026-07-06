const pool = require('../config/db');

async function create({ name, email, passwordHash, role = 'customer' }) {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
    [name, email, passwordHash, role]
  );
  return findById(result.insertId);
}

async function findByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0] || null;
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0] || null;
}

async function findAnyAdmin() {
  const [rows] = await pool.query('SELECT id FROM users WHERE role = ? LIMIT 1', ['admin']);
  return rows[0] || null;
}

async function setResetToken(userId, resetToken, resetTokenExpires) {
  await pool.query(
    'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?',
    [resetToken, resetTokenExpires, userId]
  );
}

async function findByResetToken(resetToken) {
  const [rows] = await pool.query('SELECT * FROM users WHERE reset_token = ?', [resetToken]);
  return rows[0] || null;
}

async function updatePasswordAndClearToken(userId, passwordHash) {
  await pool.query(
    'UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?',
    [passwordHash, userId]
  );
}

function toSafeUser(user) {
  if (!user) return null;
  const { password_hash, reset_token, reset_token_expires, ...safeUser } = user;
  return safeUser;
}

module.exports = {
  create,
  findByEmail,
  findById,
  findAnyAdmin,
  setResetToken,
  findByResetToken,
  updatePasswordAndClearToken,
  toSafeUser,
};
