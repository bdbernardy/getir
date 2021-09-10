exports.validateBody = schema => {
  return async (req, res, next) => {
    try {
      const validatedBody = await schema.validateAsync(req.body, { stripUnknown: true });
      req.body = validatedBody;
    } catch (err) {
      next(err);
    }
    next();
  };
};
