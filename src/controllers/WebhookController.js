/**
 * Module for the WebhookController.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import createError from 'http-errors'
import { WebhookService } from '../services/WebhookService.js'
import validator from 'validator'
import links from '../auth_and_links/hateoas.js'

/**
 * Encapsulates a controller.
 */
export class WebhookController {
  /**
   * The service.
   *
   * @type {WebhookService}
   */
  #service

  /**
   * Initializes a new instance.
   *
   * @param {WebhookService} service - A service instantiated from a class with the same capabilities as WebhookService.
   */
  constructor (service = new WebhookService()) {
    this.#service = service
  }

  /**
   * Send information about the webhook fucntionality..
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    res
      .status(200)
      .json(links.webhookWelcome)
  }

  /**
   * Provide req.webhook to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the webhook to load.
   */
  async loadWebhook (req, res, next, id) {
    try {
      // Get the webhook.
      const webhook = await this.#service.getById(id)

      // If no webhook found send a 404 (Not Found).
      if (!webhook) {
        next(createError(404, 'The requested resource was not found.'))
        return
      }

      // Provide the webhook to req.
      req.webhook = webhook
      // Next middleware.
      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Register a webhook.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      const newWebhook = await this.#service.insert({
        url: req.body.url,
        accessToken: req.body.accessToken,
        ownerID: req.user.id
      })

      res
        .status(201)
        .json({
          webhook: {
            url: newWebhook.url,
            id: newWebhook._id,
            ownerID: newWebhook.ownerID
          },
          self: `${process.env.BASE_URL}/webhooks/${newWebhook._id}`,
          options: ['delete']
        })
    } catch (error) {
      let err = error

      if (err.code === 11000) {
        err = createError(409)
        err.cause = error
        err.message = 'This url is already being used for a webhook.'
      } else if (error.name === 'ValidationError') {
        err = createError(400)
        err.cause = error
        err.message = 'You must provide an access token of at least 16 characters and a valid url.'
      }
      next(err)
    }
  }

  /**
   * Delete a webhook.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async delete (req, res, next) {
    if (this.authorized(req)) {
      try {
        await this.#service.delete(req.webhook._id)
        res
          .status(204)
          .end()
      } catch (error) {
        next(error)
      }
    } else {
      next(createError(401))
    }
  }

  /**
   * Fire a webhook.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async fire (req, res, next) {
    console.log('A webhook has been fired!')
    try {
      const [authenticationScheme, token] = req.headers.authorization?.split(' ')

      if (authenticationScheme !== 'Bearer') {
        throw new Error('Invalid authentication scheme.')
      }
      if (token !== process.env.FIRE_WEBHOOK_AUTH) {
        throw new Error(createError(403))
      }
      const webhooks = await this.#service.get()

      Array.from(webhooks).forEach(async (hook) => {
        if (validator.isURL(hook.url) && !validator.isEmail(hook.url)) {
          const response = await fetch(hook.url, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              accessToken: hook.accessToken,
              type: req.body.type,
              username: req.body.user.username,
              languages: req.body.user.languages
            })
          })
          if (!response.ok || !response) {
            throw new Error('Something went wrong when posting the webhook')
          }
        }
      })

      res
        .status(200)
        .end()
    } catch (error) {
      if (error.status === 403) {
        error.message = 'Not authorized'
      }
      next(error)
    }
  }

  /**
   * Checks so that the user is the owner of the resource.
   *
   * @param {object} req - Express request object.
   * @returns {boolean} - True if the user is the owner.
   */
  authorized (req) {
    return req.user.id === req.webhook.ownerID
  }
}
