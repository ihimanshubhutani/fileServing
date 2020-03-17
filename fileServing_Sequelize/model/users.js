const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = new Sequelize('deqode', 'himanshu', 'root', {
  dialect: 'postgres',
  logging: false
});

class User extends Model { }
User.init({
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'users',
  timestamps: false,
});

User.sync().then(console.log('Sync Done'));

module.exports = User;