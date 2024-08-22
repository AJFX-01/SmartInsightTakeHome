import { Sequelize } from 'sequelize';
import config from './config.js';


//const config = configFile['development'];
// const config = require('./config.json')['development'];
// eslint-disable-next-line no-undef
const environment = process.env.NODE_ENV || 'development';
const { username, password, database, host, dialect, port } = config[environment];

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  port: port,
  logging: false,
});

export default sequelize;