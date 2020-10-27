const { GeneralError } = require('../utils/errors');

// eslint-disable-next-line no-unused-vars
const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'ERROR',
    message: err.message,
  });
};

module.exports = handleErrors;
