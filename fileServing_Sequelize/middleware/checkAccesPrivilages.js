const { verifyUserWithFile } = require('../controller/files-dataHandler');

module.exports = (req, res, next) => {
  if (req.session.username !== req.params.user) {
    return res.send(401, '/login');
  }
  verifyUserWithFile(req.session.username, req.params.id)
    .then((result) => {
      if (!result) return res.redirect(403, '/');
      next();
    });

}