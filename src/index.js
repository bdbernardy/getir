require('dotenv').config();

const { createServer } = require('./create-server');
const { client } = require('./mongodb');

const PORT = process.env.PORT ?? 5050;

async function bootstrap() {
  await client.connect();

  const app = createServer();

  app.listen(PORT);
}

bootstrap();
