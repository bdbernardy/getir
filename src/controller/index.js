exports.get = (req, res) => {
  res.end('Your endpoint is up and running.');
};

exports.post = async (req, res, next) => {
  const handler = async (req, res) => {
    // If we're in here then the query was valid!
    res.end(`Post ${req.body.name}!`);
  };

  handler(req, res, next).catch(next);
};
