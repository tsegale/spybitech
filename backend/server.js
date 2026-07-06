const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const env = require('./src/config/env');
const authRoutes = require('./src/routes/authRoutes');
const { errorHandler, notFoundHandler } = require('./src/middleware/errorHandler');
const AppError = require('./src/utils/appError');

const app = express();

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new AppError('Not allowed by CORS', 403, 'CORS_FORBIDDEN'));
    },
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Spybitech backend listening on port ${env.port}`);
});
