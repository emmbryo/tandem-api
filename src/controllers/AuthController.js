/**
 * Module for the AuthController.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import createError from 'http-errors'
import { AuthService } from '../services/AuthService.js'
import links from '../auth_and_links/hateoas.js'

/**
 * Encapsulates a controller.
 */
export class AuthController {
  /**
   * The service.
   *
   * @type {AuthService}
   */
  #service

  /**
   * Initializes a new instance.
   *
   * @param {AuthService} service - A service instantiated from a class with the same capabilities as AuthService.
   */
  constructor (service = new AuthService()) {
    this.#service = service
  }

  /**
   * Authenticates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      res
        .status(200)
        .json(links.authWelcome)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Provide req.user to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the task to load.
   */
  async loadUser (req, res, next, id) {
    try {
      const user = await this.#service.getById(id)

      if (!user) {
        next(createError(404, 'The requested resource was not found.'))
        return
      }
      req.user = user

      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Authenticates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      const accessToken = await this.#service.login(req.body.username, req.body.password)

      res
        .status(200)
        .json({
          access_token: accessToken,
          register_tandem_user: links.registerTandem
        })
    } catch (error) {
      // Authentication failed.
      const err = createError(401)
      err.cause = error
      err.message = 'Credentials invalid or not provided.'

      next(err)
    }
  }

  /**
   * Creates a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      const user = await this.#service.register({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        permissionLevel: req.body.permissionLevel
      })

      res
        .status(201)
        .json({
          id: user._id,
          self: `${process.env.BASE_URL}/auth/users/${user._id}`,
          options: ['delete'],
          login: links.loginInfo
        })
    } catch (error) {
      let err = error

      if (err.code === 11000) {
        err = createError(409)
        err.cause = error
        err.message = 'Username or email already in use.'
      } else if (error.name === 'ValidationError') {
        err = createError(400)
        err.cause = error
        err.message = 'Please confirm that the email/username is valid and/or that the password is over 10 characters.'
      }
      next(err)
    }
  }

  /**
   * Deletes a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async delete (req, res, next) {
    try {
      await this.#service.delete(req.body.username, req.body.password)
      res
        .status(204)
        .end()
    } catch (error) {
      // auth failed
      const err = createError(401)
      err.cause = error
      err.message = 'Credentials invalid or not provided.'
      next(err)
    }
  }
}
