import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Autobot = sequelize.define('Autobot', {
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
//   company_name: DataTypes.STRING,
//   company_catchPhrase: DataTypes.STRING,
//   company_bs: DataTypes.STRING,
//   address_street: DataTypes.STRING,
//   address_suite: DataTypes.STRING,
//   address_city: DataTypes.STRING,
//   address_zipcode: DataTypes.STRING,
//   geo_lat: DataTypes.STRING,
//   geo_lng: DataTypes.STRING,
}, {
  timestamps: false,
});

export default Autobot;
