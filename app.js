const express = require('express')
const router = express.Router()

module.exports = () => {
    const signUpRouter = new SignUpRouter()
    router.post('/signup', ExpressRouterAdapter.adapt(signUpRouter))
}

class ExpressRouterAdapter {
    static adapt(router) {
        return async (req, res) => {
            const httpRequest = {
                body: req.body
            }
            const httpResponse = await router.router(httpRequest)
            return res.status(httpResponse.statusCode).json(httpResponse.body)
        }
    }
}


// signup-router
// Presentation layer
class SignUpRouter {
    async route(httpRequest) {
        const { email, password, repeatPassword } = httpRequest.body
        const user = new SignUpUseCase().sigup({ email, password, repeatPassword })
        return {
            statusCode: 201,
            body: user
        }
    }
}

// signup-usecase
// Domain layer
class SignUpUseCase {
    async sigup({ email, password, repeatPassword }) {
        if (password === repeatPassword) {
            const user = await new AddAccountRepository().add({ email, password })
            return user
        }
    }
}

// add-account-repository
// Infra layer
const mongoose = require('mongoose')
const AccountModel = mongoose.model('account')
class AddAccountRepository {
    async add({ email, password }) {
        const user = await AccountModel.create({ email, password })
        return user
    }
}


