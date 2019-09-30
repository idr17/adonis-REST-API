'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

const BaseController = require('./BaseController')

/** @type {typeof import('../../../Models/User')} */

const User = use('App/Models/User')
const UnAuthorizeException = use('App/Exceptions/UnAuthorizeException')

/**
 *
 * @class UsersController
 */
class UsersController extends BaseController {
  /**
   * Index
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response, decodeQuery }) {
    const users = await User.query(decodeQuery()).fetch()
    return response.apiCollection(users)
  }

  /**
   * Show
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ request, response, instance, decodeQuery }) {
    const user = instance
    return response.apiItem(user)
  }

  /**
   * Update
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * 
   */
  async update ({ request, response, params, instance, auth }) {

    await this.validate(request.only(['name']), { name: 'required' })

    // hanya bisa update account nya sendiri (logined account)
    const user = instance
    if (String(auth.user._id) !== String(user._id)) {
      throw UnAuthorizeException.invoke()
    }
    user.merge(request.only(['name', 'locale']))
    
    await user.save()
    return response.apiUpdated(user)
  }

  /**
   * Destroy
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * 
   */
  async destroy ({ request, response, instance, auth }) {
    
    // hanya bisa delete account milik sendiri (logined account)
    const user = instance
    if (String(auth.user._id) !== String(user._id)) {
      throw UnAuthorizeException.invoke()
    }
    await user.delete()
    return response.apiDeleted()
  }

}

module.exports = UsersController
