/**
 * Webhook routes.
 *
 * @version 1.0.0
 */

import authenticateJWT from '../../../auth_and_links/authentication.js'
import express from 'express'
export const router = express.Router()

/**
 * Resolves an WebhookController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} - An object that can act as a WebhookController object.
 */
const resolveWebhookController = (req) => req.app.get('container').resolve('WebhookController')

// eslint-disable-next-line jsdoc/require-jsdoc
function test (req, res, next) {
  next()
}

// Map HTTP verbs and route paths to controller actions.

// Provide req.webhook to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => resolveWebhookController(req).loadWebhook(req, res, next, id))

// GET
router.get('/', (req, res, next) => resolveWebhookController(req).index(req, res, next))

// POST
router.post('/register',
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => resolveWebhookController(req).register(req, res, next))

router.post('/fire', (req, res, next) => resolveWebhookController(req).fire(req, res, next))

// DELETE
router.delete('/:id',
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => test(req, res, next),
  (req, res, next) => resolveWebhookController(req).delete(req, res, next))
