const crypto = require('crypto').createHash('md5');

/**
 * If body has any password field, populates it with its cryptographic hash 
 */
module.exports = (req, res, next) => {
  const password = req.body.password;
  if (password) {
    req.body.password = crypto.update(password).digest('hex');
  }

  next();
};