const express = require('express');

const validator = require('./validator');
const { get, post } = require('./controller');
const errorHandler = require('./errors');

exports.createServer = () => {
  const app = express();

  app.get('/', get);

  app.post('/', express.json(), validator, post);

  app.use(errorHandler);

  return app;
};
