import mongoose from 'mongoose'

const { Schema } = mongoose

const connection = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
}

await connection().catch(err => {
  throw new Error(err.message)
})

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

const User = mongoose.models.user || mongoose.model('user', userSchema)

export default User