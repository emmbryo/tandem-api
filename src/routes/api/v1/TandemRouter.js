/**
 * Tandem routes.
 *
 * @version 1.0.0
 */

import authenticateJWT from '../../../auth_and_links/authentication.js'
import express from 'express'
export const router = express.Router()

/**
 * Resolves an TandemController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} - An object that can act as a TandemController object.
 */
const resolveTandemController = (req) => req.app.get('container').resolve('TandemController')

// Map HTTP verbs and route paths to controller actions.

// Provide req.tandemUser to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => resolveTandemController(req).loadTandemUser(req, res, next, id))

// The base of tandem routes.
router.get('/',
  (req, res, next) => resolveTandemController(req).index(req, res, next)
)

// Get all TandemUsers
router.get('/users',
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => resolveTandemController(req).getUsers(req, res, next)
)

// Create an TandemUser
router.post('/users',
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => resolveTandemController(req).create(req, res, next)
)

// get a TandemUser specified by id
router.get('/users/:id',
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => resolveTandemController(req).find(req, res, next)
)

// Total update of a TandemUser
router.put('/users/:id',
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => resolveTandemController(req).update(req, res, next)
)

// Partial update of a TandemUser
router.patch('/users/:id',
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => resolveTandemController(req).partiallyUpdate(req, res, next)
)

// Delete a TandemUser
router.delete('/users/:id',
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => resolveTandemController(req).delete(req, res, next)
)
