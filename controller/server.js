const express = require('express');
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');
const session = require('express-session')
const config = require('config');
const bodyParser = require('body-parser');

const authenticate = require('./../middleware/authenticate.js');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: config.SECRET, resave: false,
  saveUninitialized: true,
}));

app.use(fileUpload());

/**
 * Displays file on browser
 */
app.use('/files', express.static('./public'));

app.use('/files', require('./../routes/files'));
app.use('/login', require('./../routes/login'));

/**  *********CREDENTIALS ********* 
 *    userid - abc
 *    password - abc123
 */

app.get('/', authenticate, (req, res) => res.sendFile('index.html',
  { root: path.join(__dirname, '../views/') })
);

app.listen(3000, console.log('Running Server'));
