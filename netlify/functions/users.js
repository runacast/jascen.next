import mongoose from 'mongoose'
import User from '../../src/models/Users'

const connection = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
}

const handler = async (event) => {

  try{

    const method = event.httpMethod

    await connection().catch(err => console.log(err))

    if (method == 'GET') {

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'Post success!' })
      }

    }

    if (method == 'POST') {

      const user = new User({
        cod: 1,
        surnames: 'Foo',
        names: 'Foo',
        cid: 34234234,
        alias: '""'
      })

      console.log("Guardando usuario...")
      await user.save()
      console.log("Usuario guardado.")

      return {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'User inserted' })
      }

    }

  }catch(e){
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error en el servidor' })
    }
  }

}

export {
  handler
}