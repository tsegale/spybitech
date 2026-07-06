# Spybitech Backend — Phase 1

Node.js + Express + MySQL backend for Spybitech Investments CC. Phase 1 covers
project scaffolding and user authentication only.

## Stack

- Node.js + Express
- MySQL via `mysql2` (connection pooling, plain SQL — no ORM)
- JWT access tokens
- bcrypt password hashing
- express-rate-limit on login/forgot-password
- helmet + cors

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create a MySQL database (matching `DB_NAME` below) and copy the env file:

   ```
   cp .env.example .env
   ```

   Fill in `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`,
   `JWT_EXPIRES_IN`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ALLOWED_ORIGINS`.

3. Run migrations:

   ```
   npm run migrate
   ```

4. Seed the initial admin user (only runs if no admin exists yet):

   ```
   npm run seed:admin
   ```

5. Start the server:

   ```
   npm start
   ```

   Or with auto-restart on file changes:

   ```
   npm run dev
   ```

## Migrations

`migrations/` holds numbered, plain `.sql` files. `npm run migrate` runs any
files not yet recorded in the `migrations_log` table, in filename order. Add
new migrations as `002_*.sql`, `003_*.sql`, etc.

## API

All endpoints are under `/api/auth`. Base URL below assumes `PORT=4000`.

### Register

```
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","password":"secretpass123"}'
```

Returns `201` with `{ "user": {...}, "token": "..." }`.

### Login

```
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"secretpass123"}'
```

Returns `200` with `{ "user": {...}, "token": "..." }`. Failures always return
a generic "Invalid credentials" error, whether or not the email is registered.
Limited to 5 attempts per 15 minutes per IP.

### Forgot password

```
curl -X POST http://localhost:4000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com"}'
```

Always returns `200` with a generic success message, regardless of whether
the email exists. If it does, a reset token is generated (1 hour expiry) and
the reset link is logged to the server console (real email delivery is a
later task — see `src/utils/email.js`). Limited to 5 attempts per 15 minutes
per IP.

### Reset password

```
curl -X POST http://localhost:4000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"<token from console log>","new_password":"newsecretpass123"}'
```

Returns `200` on success, `400` if the token is invalid or expired.

### Current user

```
curl http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer <token from login/register>"
```

Returns `200` with `{ "user": {...} }`. Requires a valid JWT.

## Error shape

All errors are returned as:

```json
{ "error": { "message": "...", "code": "..." } }
```

## What's not in Phase 1

No services/quotes/tickets, no real email sending, no 2FA, no audit logging,
no refresh tokens. See the project brief for the full Phase 1 scope.
