import mongoose from 'mongoose'
import { unique } from 'next/dist/build/utils'

const { Schema } = mongoose

const userSchema = new Schema({
  cod: {
    type: Number,
    unique: true
  },
  cid: {
    type: Number,
    unique: true
  },
  surnames: String,
  names: String,
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

const User = mongoose.models.user || mongoose.model('user', userSchema)

export default User