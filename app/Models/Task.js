'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/**
 * @swagger
 * components:
 *   schemas:
 *     NewTask:
 *       type: object
 *       required:
 *         - task_name
 *       properties:
 *         task_name:
 *           type: string
 *     UpdateTask:
 *       type: object
 *       properties:
 *         task_name:
 *           type: string
 *     Task:
 *       allOf:
 *         - $ref: '#/components/schemas/NewTask'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 */

class Task extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Task
