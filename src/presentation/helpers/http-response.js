const MissingParamError = require('./missing-param-error')
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
}
