const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const User = require('../model/users');

const sequelize = new Sequelize('deqode', 'himanshu', 'root', {
  dialect: 'postgres',
  logging: false
});

class filePaths extends Model { }

filePaths.init({
  filePath: Sequelize.STRING
}, { sequelize });

User.hasMany(filePaths, { foreignKey: 'username' });

sequelize.sync().then(console.log('filePath Model Connected'));

module.exports = filePaths;
