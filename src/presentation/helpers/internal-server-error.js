module.exports = class InternalServerError extends Error {
  constructor () {
    super('Internal servere error')
    this.name = 'InternalServerError'
  }
}
