'use strict';

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts',
          key: 'id',
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Comments');
  },
};

// export async function up(queryInterface, Sequelize) {
//   /**
//    * Add altering commands here.
//    *
//    * Example:
//    * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//    */
//   await queryInterface.createTable('Comments', {
//     id: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     body: {
//       type: Sequelize.TEXT,
//       allowNull: true,
//     },
//     postId: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: 'Posts',
//         key: 'id',
//       },
//       allowNull: false,
//     },
//     createdAt: {
//       allowNull: false,
//       type: Sequelize.DATE,
//       defaultValue: Sequelize.NOW,
//     },
//     updatedAt: {
//       allowNull: false,
//       type: Sequelize.DATE,
//       defaultValue: Sequelize.NOW,
//     },
//   });
// }
// export async function down(queryInterface) {
//   /**
//    * Add reverting commands here.
//    *
//    * Example:
//    * await queryInterface.dropTable('users');
//    */

//     await queryInterface.dropTable('Comments');
  
// }
