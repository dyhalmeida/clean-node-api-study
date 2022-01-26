const validator = require('validator')
const EmailValidator = require('./email-validator')

const makeSut = () => {
  const sut = new EmailValidator()
  return {
    sut
  }
}

describe('Email validator', () => {
  test('Should return true if validator returns true', () => {
    const { sut } = makeSut()
    const isEmailValid = sut.isValid('any_email@mail.com')
    expect(isEmailValid).toBe(true)
  })

  test('Should return false if validator returns false', () => {
    const { sut } = makeSut()
    validator.isEmailValid = false
    const isEmailValid = sut.isValid('invalid_email@mail.com')
    expect(isEmailValid).toBe(false)
  })

  test('Should call validator with correct email', () => {
    const { sut } = makeSut()
    const email = 'invalid_email@mail.com'
    sut.isValid(email)
    expect(validator.email).toBe(email)
  })
})
