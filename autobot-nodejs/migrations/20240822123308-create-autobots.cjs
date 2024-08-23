'use strict';

// /** @type {import('sequelize-cli').Migration} */
// export async function up(queryInterface, Sequelize) {
//   /**
//    * Add altering commands here.
//    *
//    * Example:
//    * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//    */
//   await queryInterface.createTable('Autobots', {
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
//     username: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     phone: {
//       type: Sequelize.STRING,
//       allowNull: true,
//     },
//     website: {
//       type: Sequelize.STRING,
//       allowNull: true,
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
//   await queryInterface.dropTable('Autobots');
// }

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Autobots', {
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
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') ,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Autobots');
  },
};
