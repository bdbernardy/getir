const Joi = require('joi').extend(require('@joi/date'));

const mySchema = Joi.object({
  startDate: Joi.date().format('YYYY-MM-DD').utc().max(Joi.ref('endDate')).required(),
  endDate: Joi.date().format('YYYY-MM-DD').utc().required(),
  minCount: Joi.number().integer().max(Joi.ref('maxCount')).required(),
  maxCount: Joi.number().integer().required()
});

module.exports = async (req, res, next) => {
  try {
    const sanitizedBody = await mySchema.validateAsync(req.body, { stripUnknown: true });
    req.body = sanitizedBody;
  } catch (err) {
    // TODO replace with validation response
    next(err);
  }
  next();
};
