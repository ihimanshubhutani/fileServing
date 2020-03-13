const express = require('express');
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');
const routes = express.Router();

const uploadFile = (res, file, filename) => {
  file.mv(`./public/${filename}`, function (err) {
    if (err)
      return res.status(500).send(err);
    res.send(`Your FileId:<h3>${filename}</h3> 
    \n To access in future goto: http://localhost:3000/${filename}`);
  });
};

const authenticate = require('./../middleware/authenticate.js');

routes.use(authenticate);

routes.get('/upload', (req, res) => {
  res.sendFile('upload.html', { root: path.join(__dirname, '../views/') })
});

// To download files directly from browser
routes.get('/download/:id', (req, res) => {
  res.download(`./public/${req.params.id}`);
});

routes.post('/upload', function (req, res) {
  if (!req.files) {
    return res.status(400).send({ message: 'No files were uploaded' });
  }

  const file = req.files.uploadedFile;
  const filename = `${uuid.v4()}${path.extname(file.name)}`;
  uploadFile(res, file, filename);
});

routes.get('/update', (req, res) => {
  res.sendFile('update.html', { root: path.join(__dirname, '../views/') });
});

routes.post('/update', (req, res) => {
  console.log(req.files);
  uploadFile(res, req.files.updatedFile, req.body.filename);
});

// On browser , can't use DELETE OR PUT  
// Directly deletes from browser side.
routes.get('/delete/:id', (req, res) => {

  try {
    fs.unlinkSync(`./ public / ${req.params.id}`);
    res.send({ message: "Removed Succesfully" });
  } catch (err) {
    res.status(404).send({ message: "File Cannot be deleted", err })
  }
});

module.exports = routes;
