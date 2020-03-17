const filePaths = require('./../model/filePaths');

const saveFilePath = (path, username) => filePaths.create({
  filePath: path,
  username
});

const deleteFilePath = (path, username) => filePaths.destroy({
  where: {
    filePath: path
  }
});

const verifyUserWithFile = (username, fileId) => new Promise(resolve => filePaths.findOne({
  where: {
    username,
    filePath: `./public/${fileId}`
  }
}).then(resolve));

module.exports = { saveFilePath, deleteFilePath, verifyUserWithFile };
