import mongoose from 'mongoose'
import User from '@/models/Users'

const connection = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
}

export const handler = async (event) => {

  const method = event.httpMethod

  connection().catch(err => console.log(err))

  if(method == 'GET'){

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