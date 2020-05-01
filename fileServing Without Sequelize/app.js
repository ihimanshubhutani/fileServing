const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const session = require('express-session')
const config = require('config');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: config.SECRET, resave: false,
  saveUninitialized: true,
}));

app.use(fileUpload());

/**  *********CREDENTIALS ********* 
 *    userid - abc
 *    password - abc123
 */

/**
 * Displays file on browser
 */
app.use('/files', express.static('./public'));

app.use('/files', require('./routes/files'));
app.use('/login', require('./routes/login'));
app.use('/', require('./routes/index'));

app.listen(3000, console.log('Running Server'));
