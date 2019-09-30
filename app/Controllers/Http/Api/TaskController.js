'use strict'

const BaseController = require('./BaseController')
const UnAuthorizeException = use('App/Exceptions/UnAuthorizeException')
const Task = use('App/Models/Task')

class TaskController extends BaseController {
  
    /**
   * Index
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response, decodeQuery }) {
    const tasks = await Task.query(decodeQuery()).fetch()
    return response.apiCollection(tasks)
  }

  /**
   * Show
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ request, response, params, instance, decodeQuery }) {
    const task = await Task.find(params.id)
    if (!task) return response.status(404).json({data: 'Data not found'})

    return response.apiItem(task)
  }

    /**
   * Store
   * 
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {

    await this.validate(request.only(['task_name']), { task_name: 'required' })

    const taskInfo = request.only(['task_name'])
    const task = new Task()
    task.task_name = taskInfo.task_name

    // get user logined id
    task.createdBy = auth.user._id

    await task.save()
    return response.apiCreated(task)
  }

    /**
   * Update
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   */
  async update ({ request, response, params, auth }) {

    const task = await Task.find(params.id)
    if (!task) return response.status(404).json({data: 'Data not found'})

    // hanya bisa update task milik sendiri (logined account)
    if (String(auth.user._id) !== String(task.createdBy)) {
      throw UnAuthorizeException.invoke()
    }

    await this.validate(request.only(['task_name']), { task_name: 'required' })

    const taskInfo = request.only(['task_name'])
    
    task.task_name = taskInfo.task_name
    await task.save()
  
    return response.apiUpdated(task)
  }

  /**
   * Destroy
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response, auth }) {
    const task = await Task.find(params.id)
    if (!task) return response.status(404).json({data: 'Data not found'})

    // hanya bisa delete task milik sendiri (logined account)
    if (String(auth.user._id) !== String(task.createdBy)) {
      throw UnAuthorizeException.invoke()
    }

    await task.delete()
    return response.apiDeleted()
  }

}

module.exports = TaskController
