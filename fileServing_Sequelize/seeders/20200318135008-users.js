'use strict';
/**
 * This is just simple seed which sets some default data in table 
 */
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      username: 'random user',
      password: 'random'
    }], { attributes: { exclude: ['id'] } });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
