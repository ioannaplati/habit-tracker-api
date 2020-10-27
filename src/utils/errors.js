class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    if (this instanceof InvalidSchema) {
      return 422;
    }

    return 500;
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class InvalidSchema extends GeneralError {}

module.exports = {
  BadRequest,
  GeneralError,
  InvalidSchema,
  NotFound,
};
