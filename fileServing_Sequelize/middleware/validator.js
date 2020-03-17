const User = require('./../model/users');
const config = require('config');

const isValidPassword = (password) => {

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  console.log(passwordRegex.test(password));

  return passwordRegex.test(password);
}

const isAlreadyExists = (username) => new Promise((resolve) =>
  User.findOne({ where: { username } })
    .then((result) => resolve(result)));

module.exports = (req, res, next) => {

  if (!isValidPassword(req.body.password)) {
    return res.status(401).send({ message: config.MESSAGE.INVALID_PASSWORD });
  }

  isAlreadyExists(req.body.username).
    then((response) => {

      if (response) {
        return res.status(401).send({ message: config.MESSAGE.USER_EXISTS });
      }

      next();
    });


}