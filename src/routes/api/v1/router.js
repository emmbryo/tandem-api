/**
 * Auth routes.
 *
 * @version 1.0.0
 */

import express from 'express'
import { router as authRouter } from './AuthRouter.js'
import { router as tandemRouter } from './TandemRouter.js'
import { router as webhookRouter } from './WebhookRouter.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({
  message: 'Welcome to this language tandem API!',
  instructions: 'Please register an account and log in. You will be provided with a jwt upon login. This is used for authentication when creating your tandem profile. Good luck with finding a language tandem partner :)',
  links: {
    self: `${process.env.BASE_URL}`,
    auth_info: `${process.env.BASE_URL}/auth`,
    register: `${process.env.BASE_URL}/auth/register`,
    login: `${process.env.BASE_URL}/auth/login`,
    tandem_info: `${process.env.BASE_URL}/tandem`,
    users: `${process.env.BASE_URL}/tandem/users`,
    user_by_id: `${process.env.BASE_URL}/tandem/users/:id`,
    webhook: `${process.env.BASE_URL}/webhooks`
  }
}))

router.use('/auth', authRouter)
router.use('/tandem', tandemRouter)
router.use('/webhooks', webhookRouter)
