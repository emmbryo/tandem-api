/**
 * Module for TandemRepository.
 *
 * @version 1.0.0
 */

import { MongooseRepositoryBase } from './MongooseRepositoryBase.js'
import { TandemModel } from '../models/TandemModel.js'

/**
 * Encapsulates a user repository.
 */
export class TandemRepository extends MongooseRepositoryBase {
  /**
   * Initializes a new instance.
   *
   * @param {TandemModel} [model=TandemModel] - A class with the same capabilities as TandemModel.
   */
  constructor (model = TandemModel) {
    super(model)
  }
}
