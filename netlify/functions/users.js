import { connectDB } from '../../src/lib/db'
import User from '../../src/models/User'

const handler = async (event) => {

  try{

    await connectDB()

    const method = event.httpMethod

    if (method == 'GET') {

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'Get success!' })
      }

    }

    if (method == 'POST') {

      const total = await User.countDocuments()
      const data = JSON.parse(event.body)
      
      const user = new User({
        cod: total + 1,
        surnames: data.apellidos,
        names: data.nombres,
        cid: data.cedula,
        alias: data.apodo,
        phone: data.telefono,
        email: data.correo
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

    if (method == 'PUT') {

      const data = JSON.parse(event.body)

      await User.updateOne({ _id: data.id }, {
        cod: data.codigo,
        surnames: data.apellidos,
        names: data.nombres,
        cid: data.cedula,
        alias: data.apodo,
        phone: data.telefono,
        email: data.correo
      })

      return {
        statusCode: 202,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'User modified' })
      }

    }

  }catch(e){
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error not found server.' })
    }
  }

}

export {
  handler
}