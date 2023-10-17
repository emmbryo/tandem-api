/**
 * Auth routes.
 *
 * @version 1.0.0
 */

import express from 'express'
export const router = express.Router()

/**
 * Resolves an AuthController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} - An object that can act as a AuthController object.
 */
const resolveAuthController = (req) => req.app.get('container').resolve('AuthController')

// Provide req.user to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => resolveAuthController(req).loadUser(req, res, next, id))

// Map HTTP verbs and route paths to controller actions.

router.get('/', (req, res, next) => resolveAuthController(req).index(req, res, next))

// Log in
router.post('/login', (req, res, next) => resolveAuthController(req).login(req, res, next))

// Register
router.post('/register', (req, res, next) => resolveAuthController(req).register(req, res, next))

// Delete
router.delete('/users/:id', (req, res, next) => resolveAuthController(req).delete(req, res, next))
