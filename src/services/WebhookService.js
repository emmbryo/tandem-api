/**
 * Module for the WebhookService.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import { MongooseServiceBase } from './MongooseServiceBase.js'
import { WebhookRepository } from '../repositories/WebhookRepository.js'

/**
 * Encapsulates a webhook service.
 */
export class WebhookService extends MongooseServiceBase {
  /**
   * Initializes a new instance.
   *
   * @param {WebhookRepository} [repository=new WebhookRepository()] - A repository instantiated from a class with the same capabilities as WebhookRepository.
   */
  constructor (repository = new WebhookRepository()) {
    super(repository)
  }
}
