const express = require('express');
const validator = require('./validator');
const { get, post } = require('./controller');
const errorHandler = require('./errors');

const app = express();

const PORT = process.env.PORT ?? 5050;

async function bootstrap() {
  app.get('/', get);

  app.post('/', express.json(), validator, post);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
  });
}

bootstrap();
