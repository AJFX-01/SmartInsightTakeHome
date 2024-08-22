import { DataTypes } from 'sequelize'
import sequelize from'../config/database';
import Autobot from './Autobot';

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: Autobot,
      key: 'id',
    },
  },
  title: DataTypes.STRING,
  body: DataTypes.TEXT,
}, {
  timestamps: false,
});

Autobot.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(Autobot, { foreignKey: 'userId' });

export default Post;
