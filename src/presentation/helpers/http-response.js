const MissingParamError = require('./missing-param-error')
const UnauthorizedError = require('./unauthorized-error')

module.exports = class HttpResponse {
  static badRequest (paramEmail) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramEmail)
    }
  }

  static internalServerError () {
    return {
      statusCode: 500
    }
  }

  static unauthorized () {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    }
  }
}
