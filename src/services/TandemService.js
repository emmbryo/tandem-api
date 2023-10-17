/**
 * Module for the TandemService.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import { MongooseServiceBase } from './MongooseServiceBase.js'
import { TandemRepository } from '../repositories/TandemRepository.js'

/**
 * Encapsulates a tandem service.
 */
export class TandemService extends MongooseServiceBase {
  /**
   * Initializes a new instance.
   *
   * @param {TandemRepository} [repository=new TandemRepository()] - A repository instantiated from a class with the same capabilities as TandemRepository.
   */
  constructor (repository = new TandemRepository()) {
    super(repository)
  }

  /**
   * Inserts a new document.
   *
   * @param {object} data - ...
   * @returns {object} newUser: the new document as a plain JavaScript object.
   */
  async insert (data) {
    const newUser = await this._repository.insert(data)
    if (newUser) {
      await this.#initiateWebhook(newUser, 'create')
    }

    return newUser
  }

  /**
   * Updates a document.
   *
   * @param {number} id - The value of the id for the document to update.
   * @param {object} newData - ...
   * @returns {object} updatedUser: the updated document as a plain JavaScript object.
   */
  async update (id, newData) {
    const updatedUser = await this._repository.update(id, newData)
    if (updatedUser) {
      await this.#initiateWebhook(updatedUser, 'update')
    }
    return updatedUser
  }

  /**
   * Initiates the webhook.
   *
   * @param {object} user - the created/updated tandemUser.
   * @param {string} eventType - create / update.
   */
  async #initiateWebhook (user, eventType) {
    try {
      const response = await fetch(`${process.env.BASE_URL}/webhooks/fire`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.FIRE_WEBHOOK_AUTH}`
        },
        body: JSON.stringify({
          type: eventType,
          user: {
            username: user.username,
            languages: user.languages
          }
        })
      })
      if (!response.status || response.status !== 200) {
        console.log('A problem occured with the webhook!')
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * Returns an object containing all TandemUsers that fulfilles the query.
   *
   * @param {object} query The query from the request object.
   * @returns {object} With all valid tandem users.
   */
  async getSelectedUsers (query) {
    const dbQuery = this.transformQuery(query)
    // const users = await this.get({ languages: { $elemMatch: { language: 'spa' } }, 'location.country': 'USA' })
    // const users = await this.get({ languages: { $elemMatch: { language: 'fra', level: 'A2' || 'B1' } } })

    return await this.get(dbQuery)
  }

  /**
   * Transforms request query to db query.
   *
   * @param {object} query the query to transform.
   * @returns {object} the db query.
   */
  transformQuery (query) {
    const response = {}
    for (const key in query) {
      switch (key) {
        case 'language':
          if (!response.languages) {
            response.languages = {
              $elemMatch: {
                language: ''
              }
            }
          }
          response.languages.$elemMatch.language = query.language
          break
        case 'level':
          if (!response.languages) {
            response.languages = {
              $elemMatch: {
                level: ''
              }
            }
          }
          response.languages.$elemMatch.level = query.level
          break
        case 'city':
          response['location.city'] = query.city
          break
        case 'country':
          response['location.country'] = query.country
          break
        case 'username':
          response.username = query.username
          break
        case 'role':
          response.role = {
            $in: [query.role]
          }
          break
        case 'native':
          response.native = {
            $in: [query.native]
          }
          break
        case 'limit':
          response.limit = query.limit
          break
        default:
      }
    }
    return response
  }
}
