const { MissingParamError } = require('../../utils/errors')

const makeSut = () => {
  class AuthUseCase {
    async auth ({ email, password }) {
      if (!email) throw new MissingParamError('email')
      if (!password) throw new MissingParamError('password')
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
    const promisse = sut.auth({ email: '', password: 'any_password' })
    expect(promisse).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no passsword is provided', async () => {
    const { sut } = makeSut()
    const promisse = sut.auth({ email: 'any_email@mail.com', password: '' })
    expect(promisse).rejects.toThrow(new MissingParamError('password'))
  })
})
