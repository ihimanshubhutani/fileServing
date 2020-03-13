const config = require('config');

// middleware that will authenticate and allow to use /upload /delete /update,
// only if user is logged in 
const authenticate = (req, res, next) => {

  if (!config.REGISTERED_SESSION[req.sessionID]) {
    res.redirect(401, '/login');
  }

  next();
};

module.exports = authenticate;
