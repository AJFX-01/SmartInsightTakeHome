'use strict';

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Autobots',
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
    await queryInterface.dropTable('Posts');
  },
};

// export async function up(queryInterface, Sequelize) {
//   /**
//    * Add altering commands here.
//    *
//    * Example:
//    * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//    */
//   await queryInterface.createTable('Posts', {
//     id: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     title: {
//       type: Sequelize.STRING,
//       unique: true,
//       allowNull: false,
//     },
//     body: {
//       type: Sequelize.TEXT,
//       allowNull: true,
//     },
//     userId: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: 'Autobots',
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
//   await queryInterface.dropTable('Posts');
// }
