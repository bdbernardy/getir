const Joi = require('joi');
const express = require('express');
const { validateBody } = require('./validator');

const mySchema = Joi.object({
  name: Joi.string().required()
});

const app = express();

app.get(
  '/',
  /*validator.query(querySchema),*/ (req, res) => {
    // If we're in here then the query was valid!
    res.end(`Hello ${req.query.name}!`);
  }
);

app.post('/', express.json(), validateBody(mySchema), async (req, res, next) => {
  const handler = async (req, res) => {
    // If we're in here then the query was valid!
    res.end(`Post ${req.body.name}!`);
  };

  handler(req, res, next).catch(next);
});

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(5050, () => {
  console.log('App started on port 5050');
});
