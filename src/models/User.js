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

export default async function(){

  try{
    await mongoose.connect(process.env.MONGODB_URI);
  }catch(err){
    throw new Error(err)
  }
  
  return mongoose.models.user || mongoose.model('user', userSchema)

}