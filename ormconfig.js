const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  type: 'postgres',
  entities: ['dist/**/*.model.js'],
  url:
    process.env.DATABASE_URL ||
    'postgres://postgres:postgres@localhost:5433/ts_express_template',
  logging: process.env.logging || true,
  synchronize: process.env.synchronize || true,
  uuidExtension: 'pgcrypto',
};
