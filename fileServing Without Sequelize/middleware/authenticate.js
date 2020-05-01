const config = require('config');

/**
 *   Authenticate and allow to use /upload /delete /update /download
 *   only if user is logged in.
 */
const authenticate = (req, res, next) => {
  if (!config.REGISTERED_SESSION[req.sessionID]) {
    return res.redirect(401, '/login');
  }

  next();
};

module.exports = authenticate;
