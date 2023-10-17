/**
 * Mongoose model TandemModel.
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import validator from 'validator'

const { isEmail } = validator

// Create a schema.
const schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email address is required.'],
    unique: true,
    lowercase: true,
    maxlength: 200,
    trim: true,
    validate: [isEmail, 'Please provide a valid email address.']
  },
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
    maxlength: 200,
    // - A valid username should start with an alphabet so, [A-Za-z].
    // - All other characters can be alphabets, numbers or an underscore so, [A-Za-z0-9_-].
    // - Since length constraint is 3-256 and we had already fixed the first character, so we give {2, 255}.
    // - We use ^ and $ to specify the beginning and end of matching.
    match: [/^[A-Za-z][A-Za-z0-9_-]{2,255}$/, 'Please provide a valid username.']
  },
  userID: {
    type: String,
    required: [true, 'UserID is required.'],
    trim: true,
    maxlength: 200
  },
  native: {
    type: String,
    required: [true, 'A native language must be given.'],
    trim: true,
    lowercase: true,
    maxlength: 5
  },
  languages: {
    type: [new mongoose.Schema({
      language: {
        type: String,
        lowercase: true,
        maxlength: 5,
        trim: true
      },
      level: {
        type: String,
        trim: true,
        maxlength: 2,
        enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
      }
    })],
    trim: true,
    lowercase: true,
    maxlength: 50
  },
  role: {
    type: [],
    trim: true,
    maxlength: 5
  },
  location: {
    city: {
      type: String,
      required: false,
      maxlength: 200
    },
    country: {
      type: String,
      required: false,
      maxlength: 200
    }
  },
  remote: {
    type: Boolean,
    required: false
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
  return this._id.toHexString()
})

// Create a model using the schema.
export const TandemModel = mongoose.model('Tandem', schema)
