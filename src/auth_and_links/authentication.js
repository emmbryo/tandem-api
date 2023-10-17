import createError from 'http-errors'
import jwt from 'jsonwebtoken'

const publicKey = Buffer.from(process.env.PUBLIC_KEY, 'base64').toString('ascii')

/**
 * Authenticates requests.
 *
 * If authentication is successful, `req.user`is populated and the
 * request is authorized to continue.
 * If authentication fails, an unauthorized response will be sent.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
function authenticateJWT (req, res, next) {
  try {
    const [authenticationScheme, token] = req.headers.authorization?.split(' ')

    if (authenticationScheme !== 'Bearer') {
      throw new Error('Invalid authentication scheme.')
    }

    const payload = jwt.verify(token, publicKey, {
      algorithm: 'RS256'
    })
    req.user = {
      id: payload.sub,
      username: payload.username,
      firstName: payload.given_name,
      lastName: payload.family_name,
      email: payload.email
    }
    next()
  } catch (err) {
    const error = createError(403)
    error.message = 'This endpoint requires authentication with a valid jwt.'
    error.cause = err
    next(error)
  }
}

export default authenticateJWT
