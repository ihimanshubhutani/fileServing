const express = require('express');
const routes = express.Router()
const config = require('config');
const path = require('path');

routes.get('/', (req, res) => {
  res.sendFile('login.html', { root: path.join(__dirname, '../views/') });
});

routes.post('/', (req, res) => {

  res.status(400).send({ message: 'Invalid Credentials' });
});

module.exports = routes;
