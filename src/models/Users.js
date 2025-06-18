import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
  cod: Number,
  surnames: String,
  names: String,
  cid: Number,
  alias: {
    type: String,
    require: false,
    default: null
  },
  phone: {
    type: String,
    require: false,
    default: null
  },
  email: {
    type: String,
    require: false,
    default: null
  },
  active: {
    type: Boolean,
    default: true
  }
})

const User = mongoose.model('users', userSchema)

export default User