/**
 * Module for bootstrapping.
 *
 * @version 1.0.0
 */

import { IoCContainer } from '../util/IoCContainer.js'

import { UserModel } from '../models/UserModel.js'
import { TandemModel } from '../models/TandemModel.js'
import { WebhookModel } from '../models/WebhookModel.js'

import { AuthRepository } from '../repositories/AuthRepository.js'
import { TandemRepository } from '../repositories/TandemRepository.js'
import { WebhookRepository } from '../repositories/WebhookRepository.js'

import { AuthService } from '../services/AuthService.js'
import { TandemService } from '../services/TandemService.js'
import { WebhookService } from '../services/WebhookService.js'

import { AuthController } from '../controllers/AuthController.js'
import { TandemController } from '../controllers/TandemController.js'
import { WebhookController } from '../controllers/WebhookController.js'

const iocContainer = new IoCContainer()

iocContainer.register('ConnectionString', process.env.DB_CONNECTION_STRING)

iocContainer.register('UserModelType', UserModel, { type: true })
iocContainer.register('TandemModelType', TandemModel, { type: true })
iocContainer.register('WebhookModelType', WebhookModel, { type: true })

// Register repositories
iocContainer.register('AuthRepositorySingleton', AuthRepository, {
  dependencies: [
    'UserModelType'
  ],
  singleton: true
})

iocContainer.register('TandemRepositorySingleton', TandemRepository, {
  dependencies: [
    'TandemModelType'
  ],
  singleton: true
})

iocContainer.register('WebhookRepositorySingleton', WebhookRepository, {
  dependencies: [
    'WebhookModelType'
  ],
  singleton: true
})

// Register services
iocContainer.register('AuthServiceSingleton', AuthService, {
  dependencies: [
    'AuthRepositorySingleton'
  ],
  singleton: true
})

iocContainer.register('TandemServiceSingleton', TandemService, {
  dependencies: [
    'TandemRepositorySingleton'
  ],
  singleton: true
})

iocContainer.register('WebhookServiceSingleton', WebhookService, {
  dependencies: [
    'WebhookRepositorySingleton'
  ],
  singleton: true
})

// Register controllers
iocContainer.register('AuthController', AuthController, {
  dependencies: [
    'AuthServiceSingleton'
  ]
})

iocContainer.register('TandemController', TandemController, {
  dependencies: [
    'TandemServiceSingleton'
  ]
})

iocContainer.register('WebhookController', WebhookController, {
  dependencies: [
    'WebhookServiceSingleton'
  ]
})

export const container = Object.freeze(iocContainer)
