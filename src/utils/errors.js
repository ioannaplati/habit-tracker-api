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
    if (this instanceof UnprocessableEntity) {
      return 422;
    }

    return 500;
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class UnprocessableEntity extends GeneralError {}

module.exports = {
  BadRequest,
  GeneralError,
  NotFound,
  UnprocessableEntity,
};
