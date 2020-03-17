const User = require('./../model/users');

const insertUser = (username, password) => User.create(
  { username, password }
);

const authenticateUser = (username, password) => new Promise((resolve) =>
  User.findOne({ where: { username, password } })
    .then((result) => resolve(result)));

module.exports = { insertUser, authenticateUser };
