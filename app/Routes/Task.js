'use strict'

/*
|--------------------------------------------------------------------------
| Task Routers
|--------------------------------------------------------------------------
|
*/

const Route = use('Route')

Route.group('task', () => {
    /**
     * @swagger
     * /tasks:
     *   get:
     *     tags:
     *       - Task
     *     summary: Get tasks
     *     parameters:
     *       - $ref: '#/components/parameters/ListQuery'
     *     responses:
     *       200:
     *         description: tasks
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                   $ref: '#/components/schemas/Task'
     */
     Route.get('/', 'Api/TaskController.index')
      // .middleware('auth:jwt')

    /**
     * @swagger
     * /tasks/{id}:
     *   get:
     *     tags:
     *       - Task
     *     summary: Returns task
     *     parameters:
     *       - $ref: '#/components/parameters/Id'
     *       - $ref: '#/components/parameters/SingleQuery'
     *     responses:
     *       200:
     *         description: task
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Task'
     *       404:
     *         $ref: '#/components/responses/NotFound'
     */
    Route.get('/:id', 'Api/TaskController.show')
      // .middleware('auth:jwt')

    /**
     * @swagger
     * /tasks/store:
     *   post:
     *     operationId: Create Task
     *     tags:
     *       - Task
     *     summary: Create new Task
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/NewTask'
     *     responses:
     *       201:
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Task'
     *       422:
     *         $ref: '#/components/responses/ValidateFailed'
     */
    Route.post('/', 'Api/TaskController.store')
    .middleware('auth:jwt')

      /**
     * @swagger
     * /tasks/{id}:
     *   put:
     *     tags:
     *       - Task
     *     summary: Update task
     *     parameters:
     *       - $ref: '#/components/parameters/Id'
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/NewTask'
     *     responses:
     *       202:
     *         description: update success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Task'
     *       404:
     *         $ref: '#/components/responses/NotFound'
     *       401:
     *         $ref: '#/components/responses/Unauthorized'
     *       403:
     *         $ref: '#/components/responses/Forbidden'
     *       422:
     *         $ref: '#/components/responses/ValidateFailed'
     */
    Route.put('/:id', 'Api/TaskController.update')
    .middleware(['auth:jwt'])

        /**
     * @swagger
     * /tasks/{id}:
     *   delete:
     *     tags:
     *       - Task
     *     summary: Delete task
     *     parameters:
     *       - $ref: '#/components/parameters/Id'
     *     responses:
     *       202:
     *         description: delete success
     *       404:
     *         $ref: '#/components/responses/NotFound'
     *       401:
     *         $ref: '#/components/responses/Unauthorized'
     */
    Route.delete('/:id', 'Api/TaskController.destroy')
    .middleware(['auth:jwt'])

  }).prefix('/api/tasks')
