const express = require('express');
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');
const routes = express.Router();
const uploadFile = require('../controller/fileUploader');
const authenticate = require('../middleware/authenticate.js');
const checkAccessAllowed = require('../middleware/checkAccesPrivilages');
const { deleteFilePath } = require('../controller/files-dataHandler');

/**
 * Authenticates user
 */
routes.use(authenticate);

routes.get('/:user/:id', checkAccessAllowed, (req, res) => {

  res.download(`./public/${req.params.id}`);
});

routes.get('/upload', (req, res) => {
  res.sendFile('upload.html', { root: path.join(__dirname, '../views/') })
});

routes.post('/upload', function (req, res) {
  if (!req.files) {
    return res.status(400).send({ message: 'No files were uploaded' });
  }

  const file = req.files.uploadedFile;
  const filename = `${uuid.v4()}${path.extname(file.name)}`;

  uploadFile(req, res, file, filename);
});

routes.get('/update', (req, res) => {
  res.sendFile('update.html', { root: path.join(__dirname, '../views/') });
});

/**
 * HTML forms not allows to set mehthod=PUT
 */
routes.post('/update', (req, res) => {
  console.log(req.files);
  uploadFile(req, res, req.files.updatedFile, req.body.filename);
});

/**
 * HTML forms not allows to set mehthod=PUT
 * Directly deletes from browser side.
 */
routes.get('/:user/delete/:id', (req, res) => {

  try {
    fs.unlinkSync(`./ public / ${req.params.id}`);
    res.send({ message: "Removed Succesfully" });
    deleteFilePath(`./public/${req.params.id}`);

  } catch (err) {
    res.status(404).send({ message: "File Cannot be deleted", err })
  }
});

module.exports = routes;
