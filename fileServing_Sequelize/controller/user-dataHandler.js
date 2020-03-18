const User = require('./../model/users');

/**
 * Insert Username and hashed password in database.
 * @param   {string} username 
 * @param   {string} password 
 * @returns {void}
 */
const insertUser = (username, password) => User.create(
  { username, password }
);

/**
 * Authenticates username against its password.
 * @param   {string} username 
 * @param   {string} password 
 * @returns {void}
 */
const authenticateUser = (username, password) => new Promise((resolve) =>
  User.findOne({ where: { username, password } })
    .then((result) => resolve(result)));

module.exports = { insertUser, authenticateUser };
