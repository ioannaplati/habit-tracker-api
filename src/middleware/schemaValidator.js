const { InvalidSchema } = require('../utils/errors');

function validator(schema, property) {
  return function (req, _, next) {
    const { error } = schema.validate(req[property]);

    if (!error) {
      return next();
    }

    const { details } = error;
    const message = details.map(detail => detail.message).join(',');

    throw new InvalidSchema(message);
  };
}

module.exports = validator;
