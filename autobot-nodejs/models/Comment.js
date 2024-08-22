// import { DataTypes } from 'sequelize';
// import sequelize from'../config/database';
// import Post from './Post';

// const Comment = sequelize.define('Comment', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   postId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: Post,
//       key: 'id',
//     },
//   },
//   name: DataTypes.STRING,
//   email: DataTypes.STRING,
//   body: DataTypes.TEXT,
// }, {
//   timestamps: false,
// });

// Post.hasMany(Comment, { foreignKey: 'postId' });
// Comment.belongsTo(Post, { foreignKey: 'postId' });

// export default Comment;

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Post from './Post.js';

const Comment = sequelize.define('Comments', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  body: DataTypes.TEXT,
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

export default Comment;

