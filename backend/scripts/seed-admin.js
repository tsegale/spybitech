const bcrypt = require('bcrypt');
const env = require('../src/config/env');
const userModel = require('../src/models/userModel');
const pool = require('../src/config/db');

const SALT_ROUNDS = 10;

async function run() {
  if (!env.admin.email || !env.admin.password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env to seed an admin user');
  }

  const existingAdmin = await userModel.findAnyAdmin();
  if (existingAdmin) {
    console.log('An admin user already exists. Skipping seed.');
    return;
  }

  const passwordHash = await bcrypt.hash(env.admin.password, SALT_ROUNDS);
  const admin = await userModel.create({
    name: 'Admin',
    email: env.admin.email,
    passwordHash,
    role: 'admin',
  });

  console.log(`Admin user created: ${admin.email}`);
}

run()
  .catch((err) => {
    console.error('Seeding admin failed:', err.message);
    process.exitCode = 1;
  })
  .finally(() => {
    pool.end();
  });
