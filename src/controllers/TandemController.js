/**
 * Module for the TandemController.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import createError from 'http-errors'
import links from '../auth_and_links/hateoas.js'
import { TandemService } from '../services/TandemService.js'

/**
 * Encapsulates a controller.
 */
export class TandemController {
  /**
   * The service.
   *
   * @type {TandemService}
   */
  #service

  /**
   * Initializes a new instance.
   *
   * @param {TandemService} service - A service instantiated from a class with the same capabilities as TandemService.
   */
  constructor (service = new TandemService()) {
    this.#service = service
  }

  /**
   * Return info on tandem routes.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    res
      .status(200)
      .json(links.tandemWelcome)
  }

  /**
   * Provide req.tandemUser to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the task to load.
   */
  async loadTandemUser (req, res, next, id) {
    try {
      const tandemUser = await this.#service.getById(id)

      if (!tandemUser) {
        next(createError(404, 'The requested resource was not found.'))
        return
      }

      req.tandemUser = tandemUser

      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing all/selected TandemUsers.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getUsers (req, res, next) {
    if (Object.keys(req.query).length === 0) {
      await this.getAllUsers(req, res, next)
    } else {
      await this.getSelectedUsers(req, res, next)
    }
  }

  /**
   * Sends a JSON response containing all TandemUsers.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getAllUsers (req, res, next) {
    try {
      const users = await this.#service.get()
      res
        .status(200)
        .json(users)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing all TandemUsers.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getSelectedUsers (req, res, next) {
    try {
      const users = await this.#service.getSelectedUsers(req.query)
      res
        .status(200)
        .json(users)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing a TandemUser.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async find (req, res, next) {
    const responseLinks = this.#getLinks(req.tandemUser)
    res
      .status(200)
      .json({
        user: req.tandemUser,
        self: responseLinks.self,
        options: responseLinks.options
      })
  }

  /**
   * Sends a JSON response containing all users.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async create (req, res, next) {
    try {
      const tandemUser = await this.#service.insert({
        username: req.user.username,
        email: req.user.email,
        userID: req.user.id,
        native: req.body.native,
        languages: req.body.languages,
        role: req.body.role,
        remote: req.body.remote,
        location: {
          city: req.body.location.city,
          country: req.body.location.country
        }
      })
      const responseLinks = this.#getLinks(tandemUser)
      res
        .status(201)
        .json({
          user: responseLinks.tandemUser,
          self: responseLinks.self,
          options: responseLinks.options
        })
    } catch (error) {
      let err = error

      if (err.code === 11000) {
        err = createError(409)
        err.cause = error
        err.message = 'The username or email is already in use.'
      } else if (error.name === 'ValidationError') {
        err = createError(400)
        err.cause = error
        err.message = 'A native language must be given'
      }
      next(err)
    }
  }

  /**
   * Updates a TandemUser completely.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async update (req, res, next) {
    if (this.#isAuthorized(req)) {
      try {
        if (Object.keys(req.body).length !== 5) {
          next(createError(403, 'Not the right amount of parameters for a total update, please use method PATCH instead.'))
        }
        const updated = {
          native: req.body.native,
          languages: req.body.languages,
          role: req.body.role
        }
        const updatedTandemUser = await this.#service.update(req.tandemUser._id, updated)
        const responseLinks = this.#getLinks(updatedTandemUser)
        res
          .status(200)
          .json({
            user: responseLinks.tandemUser,
            self: responseLinks.self,
            options: responseLinks.options
          })
      } catch (error) {
        next(error)
      }
    } else {
      next(createError(401))
    }
  }

  /**
   * Partially updates a TandemUser.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async partiallyUpdate (req, res, next) {
    if (this.#isAuthorized(req)) {
      const error = createError(400)
      try {
        const updated = {}
        for (const key in req.body) {
          switch (key) {
            case 'native':
              updated.native = req.body.native
              break
            case 'languages':
              updated.languages = req.body.languages
              break
            case 'role':
              updated.role = req.body.role
              break
            case 'remote':
              updated.remote = req.body.remote
              break
            default:
              error.message = 'Please provide valid paramater(s) to update: native, langugaes, role and/or role.'
              next(error)
          }
        }
        const updatedTandemUser = await this.#service.update(req.tandemUser._id, updated)
        const responseLinks = this.#getLinks(updatedTandemUser)
        res
          .status(200)
          .json({
            user: responseLinks.tandemUser,
            self: responseLinks.self,
            options: responseLinks.options
          })
      } catch (error) {
        next(error)
      }
    } else {
      next(createError(401))
    }
  }

  /**
   * Deletes a TandemUser.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async delete (req, res, next) {
    if (this.#isAuthorized(req)) {
      try {
        await this.#service.delete(req.tandemUser._id)
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
   * Checks so that the user is the owner of the resource.
   *
   * @param {object} req - Express request object.
   * @returns {boolean} - True if the user is the owner.
   */
  #isAuthorized (req) {
    return req.user.id === req.tandemUser.userID
  }

  /**
   * Creates an object containing links.
   *
   * @param {object} user the created/updated user.
   * @returns {object} with links
   */
  #getLinks (user) {
    return {
      tandemUser: {
        username: user.username,
        id: user._id
      },
      self: `${process.env.BASE_URL}/tandem/users/${user._id}`,
      options: ['get', 'put', 'patch', 'delete']
    }
  }
}
