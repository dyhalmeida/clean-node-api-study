const { MissingParamError, InvalidParamError } = require('../../utils/errors')

class LoadUserByEmailRepository {
  async load (email) {
    this.email = email
  }
}

class AuthUseCase {
  constructor (loadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
  }

  async auth ({ email, password }) {
    if (!email) throw new MissingParamError('email')
    if (!password) throw new MissingParamError('password')
    if (!this.loadUserByEmailRepository) throw new MissingParamError('loadUserByEmailRepository')
    if (!this.loadUserByEmailRepository.load) throw new InvalidParamError('loadUserByEmailRepository')
    await this.loadUserByEmailRepository.load(email)
  }
}

const makeLoadUserByEmail = () => {
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepository()
  return {
    loadUserByEmailRepositorySpy
  }
}

const makeSut = () => {
  const { loadUserByEmailRepositorySpy } = makeLoadUserByEmail()
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy)

  return {
    sut,
    loadUserByEmailRepositorySpy
  }
}

describe('Auth UseCase', () => {
  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth({ email: '', password: 'any_password' })
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no passsword is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth({ email: 'any_email@mail.com', password: '' })
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    const email = 'any_email@mail.com'
    await sut.auth({ email, password: 'any_password' })
    expect(loadUserByEmailRepositorySpy.email).toBe(email)
  })

  test('Should throw if no LoadUserByEmailRepository is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth({ email: 'any_email@mail.com', password: 'any_password' })
    expect(promise).rejects.toThrow(new MissingParamError('loadUserByEmailRepository'))
  })

  test('Should throw if no LoadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({})
    const promise = sut.auth({ email: 'any_email@mail.com', password: 'any_password' })
    expect(promise).rejects.toThrow(new InvalidParamError('loadUserByEmailRepository'))
  })
})
