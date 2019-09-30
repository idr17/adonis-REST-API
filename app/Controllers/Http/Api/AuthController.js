/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

'use strict'

const BaseController = require('./BaseController')
const LoginFailedException = use('App/Exceptions/LoginFailedException')
const crypto = require('crypto')
const uuid = require('uuid')
const User = use('App/Models/User')

class AuthController extends BaseController {
  /**
   * Register
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Request} ctx.request
   * @returns
   *
   * @memberOf UsersController
   *
   */
  async register ({ request, response }) {
    
    // validation
    await this.validate(request.only(['name', 'email', 'password', 'locale']), { name: 'required', email: 'required|email', password: 'required|min:5' })

    const user = new User(request.only(['name', 'email', 'password', 'locale']))
    const verificationToken = crypto.createHash('sha256').update(uuid.v4()).digest('hex')
    user.merge({
      verificationToken,
      verified: false
    })
    await user.save()
    return response.apiCreated(user)
  }

  /**
   * Login
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Request} ctx.request
   *
   * @memberOf AuthController
   *
   */
  async login ({ request, response, auth }) {

    const email = request.input('email')
    const password = request.input('password')
    await this.validate(request.all(), { email: 'required', password: 'required' })
    
    // Attempt to login with email and password
    let data = null
    try {
      data = await auth.authenticator('jwt').withRefreshToken().attempt(email, password)
      data.user = await User.findBy({ email })
    } catch (error) {
      throw LoginFailedException.invoke('Invalid email or password')
    }
    if (!data.user.verified) {
      // throw AccountNotVerifiedException.invoke('Email is not verified')
    }
    response.apiSuccess(data)
  }

  /**
   * Refresh token
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Request} ctx.request
   * @returns
   *
   * @memberOf AuthController
   *
   */
  async refresh ({ request, response, auth }) {
    const authData = await auth
      .authenticator('jwt')
      .newRefreshToken()
      .generateForRefreshToken(request.input('refresh_token'))
    return response.json(authData)
  }

  /**
   * Logout
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Request} ctx.request
   * @returns
   *
   * @memberOf AuthController
   *
   */
  async logout ({ request, response, auth }) {
    await auth.logout()

    return response.send('success')
  }

  /**
   * Me
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Request} ctx.request
   * @returns
   *
   * @memberOf AuthController
   *
   */
  async me ({ request, response, auth }) {
    const user = auth.user
    return response.apiSuccess(user)
  }

}

module.exports = AuthController
