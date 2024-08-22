// import { DataTypes } from 'sequelize'
// import sequelize from'../config/database';
// import Autobot from './Autobot';

// const Post = sequelize.define('Post', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: Autobot,
//       key: 'id',
//     },
//   },
//   title: DataTypes.STRING,
//   body: DataTypes.TEXT,
// }, {
//   timestamps: false,
// });

// Autobot.hasMany(Post, { foreignKey: 'userId' });
// Post.belongsTo(Autobot, { foreignKey: 'userId' });

// export default Post;


import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Autobot from './Autobot.js';

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    unique: true,
  },
  body: DataTypes.TEXT,
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: Autobot,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

export default Post;

