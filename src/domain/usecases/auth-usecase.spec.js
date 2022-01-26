const { MissingParamError } = require('../../utils/errors')

const makeSut = () => {
  class AuthUseCase {
    async auth ({ email }) {
      if (!email) throw new MissingParamError('email')
    }
  }

  const sut = new AuthUseCase()

  return {
    sut
  }
}

describe('Auth UseCase', () => {
  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const promisse = sut.auth({ email: '' })
    expect(promisse).rejects.toThrow(new MissingParamError('email'))
  })
})
