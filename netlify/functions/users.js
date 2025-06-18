import mongoose from 'mongoose'

const connection = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
}

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

export const handler = async (event) => {

  const method = event.httpMethod

  connection().catch(err => console.log(err))

  if(method == 'GET'){

    const User = mongoose.model('users', userSchema)
    const user = new User({
      cod: 1,
      surnames: 'Albin',
      names: 'Albin',
      cid: 34234234,
      alias: '""'
    })

    await user.save()

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: 'User inserted' })
    }

  }

}