const MissingParamError = require('./missing-param-error')
const UnauthorizedError = require('./unauthorized-error')
const InternalServerError = require('./internal-server-error')

module.exports = class HttpResponse {
  static badRequest (paramEmail) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramEmail)
    }
  }

  static internalServerError () {
    return {
      statusCode: 500,
      body: new InternalServerError()
    }
  }

  static unauthorized () {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    }
  }

  static created (data) {
    return {
      statusCode: 201,
      body: data
    }
  }
}
