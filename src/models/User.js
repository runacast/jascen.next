import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
  cod: {
    type: Number,
    unique: true,
    maxlength: [12]
  },
  cid: {
    type: Number,
    unique: true,
    minlength: [10],
    maxlength: [13]
  },
  user_type: {
    type: String,
    require: true,
    default: ''
  },
  surnames: {
    type: String,
    require: true,
    maxlength: [150]
  },
  names: {
    type: String,
    require: true,
    maxlength: [150]
  },
  alias: {
    type: String,
    require: false,
    default: null,
    maxlength: [150]
  },
  phone: {
    type: String,
    require: false,
    default: null,
    maxlength: [20]
  },
  email: {
    type: String,
    require: false,
    default: null,
    maxlength: [100]
  },
  active: {
    type: Boolean,
    default: true
  }
})

// Virtual para poblar propiedades (opcional, pero útil)
userSchema.virtual('properties', {
  ref: 'Property',
  localField: '_id',
  foreignField: 'user_id'
})

userSchema.set('toJSON', { virtuals: true }) // Incluye virtuals en toJSON

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User