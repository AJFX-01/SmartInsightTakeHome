import { DataTypes } from 'sequelize';
import sequelize from'../config/database';
import Post from './Post';

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: 'id',
    },
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  body: DataTypes.TEXT,
}, {
  timestamps: false,
});

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

export default Comment;
