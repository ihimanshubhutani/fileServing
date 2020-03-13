const express = require('express');
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');
const session = require('express-session')
const config = require('config');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const fs = require('fs');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: config.SECRET }));
app.use(fileUpload());

// CREDENTIALS : userid   - abc
//               password - abc123

// to view files directly
app.use(express.static('./public'));

// take cares of current user session
const registeredSessions = {};

const uploadFile = (res, file, filename) => {
  file.mv(`./public/${filename}`, function (err) {
    if (err)
      return res.status(500).send(err);
    res.send(`Your FileId:<h3>${filename}</h3> 
    \n To access in future goto: http://localhost:3000/${filename}`);
  });
}

// middleware that will authenticate and allow to use /upload /delete /update,
// only if user is logged in 
const authenticate = (req, res, next) => {

  if (!registeredSessions[req.sessionID]) {
    res.redirect(401, '/login');
  }

  next();
}

app.get('/', authenticate, (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../views/') });
})

app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: path.join(__dirname, '../views/') });
});

app.post('/login', (req, res) => {
  console.log(req.body);

  if (config.CREDENTIALS.ID === req.body.userid && config.CREDENTIALS.PASSWORD === req.body.password) {
    registeredSessions[req.sessionID] = true;
    console.log(registeredSessions);
    return res.redirect('/');
  }
  res.send({ detail: 'Invalid Credentials' });
})

app.get('/upload', authenticate, (req, res) => {
  res.sendFile('upload.html', { root: path.join(__dirname, '../views/') })
});

app.get('/download/:id', authenticate, (req, res) => {
  res.download(`./public/${req.params.id}`);
});

app.post('/upload', function (req, res) {

  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.uploadedFile;
  const filename = `${uuid.v4()}${path.extname(file.name)}`;
  uploadFile(res, file, filename);
});

app.get('/update', authenticate, (req, res) => {
  res.sendFile('update.html', { root: path.join(__dirname, '../views/') });
});

app.post('/update', (req, res) => {
  uploadFile(res, req.files.updatedFile, req.body.filename);
});

// On browser , can't use DELETE OR PUT  
// Directly deletes from browser side.
app.get('/delete/:id', (req, res) => {
  try {
    console.log(req.params.id);
    fs.unlinkSync(`./ public / ${req.params.id}`);
    res.send({ detail: "Removed Succesfully" });
  } catch (err) {
    res.send({ detail: "File Cannot be deleted", err })
  }
})

app.listen(3000, console.log('Running Server'));