const { getRecords } = require('./queries/get-records');

exports.get = (req, res) => {
  res.end('Your endpoint is up and running.');
};

exports.post = async (req, res, next) => {
  const handler = async (req, res) => {
    const records = await getRecords(req.body);
    // If we're in here then the query was valid!
    res.json({
      code: 0,
      msg: 'Success',
      records: records ?? []
    });
  };

  handler(req, res, next).catch(next);
};
