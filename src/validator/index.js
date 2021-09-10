const Joi = require('joi');

const mySchema = Joi.object({
  name: Joi.string().required()
});

module.exports = async (req, res, next) => {
  try {
    const sanitizedBody = await mySchema.validateAsync(req.body, { stripUnknown: true });
    req.body = sanitizedBody;
  } catch (err) {
    // TODO return error
    next(err);
  }
  next();
};
