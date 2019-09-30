'use strict'

/*
|--------------------------------------------------------------------------
| Auth Routers
|--------------------------------------------------------------------------
|
*/

const Route = use('Route')

Route.group('auth', () => {
  /**
   * @swagger
   * /auth/register:
   *   post:
   *     operationId: auth-register
   *     tags:
   *       - Auth
   *     summary: Register new user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewUser'
   *     responses:
   *       201:
   *         description: success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       422:
   *         $ref: '#/components/responses/ValidateFailed'
   */
  Route.post('/register', 'Api/AuthController.register')
  
  /**
   * @swagger
   * /auth/login:
   *   post:
   *     operationId: auth-login
   *     tags:
   *       - Auth
   *     summary: Login to the application
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 required: true
   *               password:
   *                 type: string
   *                 required: true
   *     responses:
   *       200:
   *         description: login success
   *         content:
   *           application/json:
   *             schema:
   *               properties:
   *                 status:
   *                   type: number
   *                 message:
   *                   type: string
   *                 type:
   *                   type: string
   *                   default: bearer
   *                 token:
   *                   type: string
   *                 refreshToken:
   *                   type: string
   *                 user:
   *                   type: object
   *                   $ref: '#/components/schemas/User'
   *       422:
   *         $ref: '#/components/responses/ValidateFailed'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   */
  Route.post('/login', 'Api/AuthController.login')

  /**
   * @swagger
   * /auth/logout:
   *   post:
   *     operationId: auth-logout
   *     tags:
   *       - Auth
   *     summary: Logout the application
   *     responses:
   *       200:
   *         description: logout success
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   */
  Route.post('/logout', 'Api/AuthController.logout').middleware('auth:jwt')

  /**
   * @swagger
   * /auth/refresh:
   *   post:
   *     operationId: auth-refresh
   *     tags:
   *       - Auth
   *     summary: Refresh token
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               status:
   *                 type: number
   *               message:
   *                 type: string
   *               refresh_token:
   *                 type: string
   *                 required: true
   *     responses:
   *       200:
   *         description: refresh success
   *         content:
   *           application/json:
   *             schema:
   *               properties:
   *                 status:
   *                   type: number
   *                 message:
   *                   type: string
   *                 type:
   *                   type: string
   *                   default: bearer
   *                 token:
   *                   type: string
   *                 refreshToken:
   *                   type: string
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   */
  Route.post('/refresh', 'Api/AuthController.refresh')

  /**
   * @swagger
   * /auth/me:
   *   get:
   *     operationId: auth-me
   *     tags:
   *       - Auth
   *     summary: Get current user
   *     responses:
   *       200:
   *         description: Current user
   *         content:
   *           application/json:
   *             schema:
   *               status:
   *                 type: number
   *               message:
   *                 type: string
   *               data:
   *                 $ref: '#/components/schemas/User'
   *       422:
   *         $ref: '#/components/responses/ValidateFailed'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   */
  Route.get('/me', 'Api/AuthController.me').middleware('auth:jwt')

}).prefix('/api/auth')

