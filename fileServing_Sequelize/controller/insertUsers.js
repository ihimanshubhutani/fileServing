const User = require('./../model/users');

module.exports = (username, password) => User.create(
  { username, password }
);
