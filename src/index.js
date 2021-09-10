require('dotenv').config();
const express = require('express');

const validator = require('./validator');
const { get, post } = require('./controller');
const errorHandler = require('./errors');
const { client } = require('./mongodb');

const app = express();

const PORT = process.env.PORT ?? 5050;

async function bootstrap() {
  await client.connect();

  app.get('/', get);

  app.post('/', express.json(), validator, post);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
  });
}

bootstrap();
