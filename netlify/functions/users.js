import { connectDB } from '../../src/lib/db'
import User from '../../src/models/User'

const handler = async (event) => {

  try{

    await connectDB()
    const method = event.httpMethod

    if (method == 'GET') {

      const params = new URLSearchParams(event.rawUrl.split('?')[1]),
      cid = parseInt(params.get('cid')) || 0,
      cod = parseInt(params.get('cod')) || 0,
      page = parseInt(params.get('page')) || 1,
      limit = parseInt(params.get('limit')) || 10,
      skip = (page - 1) * limit,
      users = await User.find({cod,cid}).skip(skip).limit(limit)

       const result = users.map(user => ({
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
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'User modified' })
      }

    }
    
    if (method == 'DELETE') {

      const data = JSON.parse(event.body)
      
      await User.deleteOne({ _id: data.id })

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