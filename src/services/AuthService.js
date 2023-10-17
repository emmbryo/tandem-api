/**
 * Module for the AuthService.
 *
 * @version 1.0.0
 */

import { AuthRepository } from '../repositories/AuthRepository.js'
import { MongooseServiceBase } from './MongooseServiceBase.js'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/UserModel.js'

/**
 * Encapsulates an auth service.
 */
export class AuthService extends MongooseServiceBase {
  // /**
  //  * The repository.
  //  *
  //  * @type {AuthRepository}
  //  */
  // _repository // protected!!!

  /**
   * The private key.
   *
   * @type {string}
   */
  #privateKey // protected!!!

  // /**
  //  * Initializes a new instance.
  //  *
  //  * @param {AuthRepository} repository - A repository instantiated from a class with the same functionality as AuthRepository.
  //  */
  // constructor (repository) {
  //   this._repository = repository
  //   this.#privateKey = Buffer.from(process.env.PRIVATE_KEY, 'base64').toString('ascii')
  // }

  /**
   * Initializes a new instance.
   *
   * @param {AuthRepository} [repository=new TandemRepository()] - A repository instantiated from a class with the same capabilities as AuthRepository.
   */
  constructor (repository = new AuthRepository()) {
    super(repository)
    this.#privateKey = Buffer.from(process.env.PRIVATE_KEY, 'base64').toString('ascii')
  }

  /**
   * Authenticates a user.
   *
   * @param {string} username - username.
   * @param {string} password - password.
   * @returns {string} access token.
   */
  async login (username, password) {
    const user = await UserModel.authenticate(username, password)

    const payload = {
      sub: user.id,
      username: user.username,
      given_name: user.firstName,
      family_name: user.lastName,
      email: user.email
    }
    // reformat key from base64 to string before signing.
    // const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'base64').toString('ascii')

    // Create the access token.
    const accessToken = jwt.sign(payload, this.#privateKey, {
      algorithm: 'RS256',
      expiresIn: process.env.ACCESS_TOKEN_LIFE
    })

    return accessToken
  }

  /**
   * Registers a User.
   *
   * @param {object} userInfo the user parameters.
   * @returns {object} user.
   */
  async register (userInfo) {
    return this._repository.insert(userInfo)
  }

  /**
   * Deletes a User.
   *
   * @param {string} username the username.
   * @param {string} password the username.
   * @returns {object} user.
   */
  async delete (username, password) {
    const user = await UserModel.authenticate(username, password)
    return this._repository.delete(user._id)
  }
}
