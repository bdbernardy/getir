const { bodySchema: bodySchema } = require('./schema');

module.exports = async (req, res, next) => {
  try {
    const sanitizedBody = await bodySchema.validateAsync(req.body, { stripUnknown: true });
    req.body = sanitizedBody;
  } catch (err) {
    next(err);
  }
  next();
};
