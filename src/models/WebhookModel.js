/**
 * Mongoose model UserModel.
 * @version 1.0.0
 */

import mongoose from 'mongoose'
// import validator from 'validator'

// Create a schema.
const schema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'url is required.'],
    unique: true
  },
  accessToken: {
    type: String,
    required: [true, 'Access token is required.'],
    minLength: [16, 'The access token must be of minimum length 16 characters.'],
    maxLength: [256, 'The access token must be of maximum length 256 characters.']
  },
  ownerID: {
    type: String,
    required: [true, 'ownerID is required']
  }
}, {
  timestamps: true,
  toJSON: {
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret._id
      delete ret.__v
    },
    virtuals: true // ensure virtual fields are serialized
  }
})

schema.virtual('id').get(function () {
  console.log('Virtual Getter for id is called')
  return this._id.toHexString()
})

// Create a model using the schema.
export const WebhookModel = mongoose.model('Webhook', schema)
