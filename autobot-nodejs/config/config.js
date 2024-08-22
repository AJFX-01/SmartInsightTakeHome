/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'test_database',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'production_database',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
  },
};
