import { Sequelize } from 'sequelize';
import configFile from './config.json';


const config = configFile['development'];
// const config = require('./config.json')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

export default sequelize;