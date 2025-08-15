import { connectDB } from '../../src/lib/db.js'
import User from '../../src/models/User.js'

const handler = async (event) => {

  try{

    await connectDB()
    const method = event.httpMethod,
    body = JSON.parse(event.body),
    data = { /** Format user data */
      cod: parseInt(body.codigo),
      surnames: body.apellidos,
      names: body.nombres,
      cid: parseInt(body.cedula),
      alias: body.apodo,
      phone: parseInt(body.telefono),
      email: body.correo
    }

    if (method == 'GET') { /** Get datalist from db */

      const params = new URLSearchParams(event.rawUrl.split('?')[1]),
      filter = {},
      key = params.get('key') || '_id',
      value = params.get('value') || null,
      page = parseInt(params.get('page')) || 1,
      limit = parseInt(params.get('limit')) || 0,
      skip = (page - 1) * limit

      if(value){
        filter[key] = value
      }

      const users = await User.find(filter).skip(skip).limit(limit),
      result = users.map(user => ({
        ...user.toObject(),
        _id: user._id.toString()
      }))

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(result)
      }

    }

    if (method == 'POST') { /** Post new data to DB */

      const total = await User.countDocuments()
      
      data.cod = total + 1
      const user = new User(data)

      await user.save()

      return {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'User inserted', data: user.toObject() })
      }

    }

    if (method == 'PUT') { /** Update data to collection on DB */

      await User.updateOne({ _id: body.id /* Verifica si esto requiere convertirlo en un ObjectId*/ }, data)

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'User modified!' })
      }

    }
    
    if (method == 'DELETE') {
      
      await User.deleteOne({ _id: body.id })

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'User deleted' })
      }
    }

  }catch(e){
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error, request not defined.' })
    }
  }

}

export {
  handler
}