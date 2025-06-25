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

const connection = async () => {
  await mongoose.connect(process.env.MONGODB_URI).
  catch(error => {
     throw new Error(error.message)
  })
}

const User = mongoose.models.user || connection.model('user', userSchema)

export default User