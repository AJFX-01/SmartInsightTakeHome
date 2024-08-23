import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Autobot = sequelize.define('Autobots', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  website: DataTypes.STRING,
}, {
  timestamps: false,
});

export default Autobot;
