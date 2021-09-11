const { ValidationError } = require('joi');

module.exports = (err, req, res) => {
  if (err instanceof ValidationError) {
    res.status(400);
    res.json({
      code: 2,
      msg: err.message,
      records: []
    });

    return;
  }

  res.status(500);
  res.json({
    code: 1,
    msg: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    records: []
  });
};
