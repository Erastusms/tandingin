require('dotenv').config();
const pg = require('pg');

module.exports = {
  development: {
    username: 'postgres',
    password: 'admin',
    database: 'tandingin',
    host: 'localhost',
    dialect: 'postgres',
    dialectModule: pg,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    dialectModule: pg,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    url: process.env.DB_URL_PROD,
    dialect: 'postgres',
    dialectModule: pg,
  }
};
