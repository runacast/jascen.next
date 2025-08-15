import { connectDB } from '../../src/lib/db.js'
import User from '../../src/models/User.js'

const handler = async (event) => {

  try {

    await connectDB()
    const method = event.httpMethod

    if (method == 'GET') { /** Get datalist from db */

      const params = new URLSearchParams(event.rawUrl.split('?')[1]),
        filter = {},
        key = params.get('key') || '_id',
        value = params.get('value') || null,
        page = parseInt(params.get('page'), 10) || 1,
        limit = parseInt(params.get('limit'), 10) || 0,
        skip = (page - 1) * limit

      if (value) {
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

    const form = await req.formData(),
      data = { /** Format user data */
        cod: parseInt(form.get('codigo'), 10),
        surnames: form.get('apellidos'),
        names: form.get('nombres'),
        cid: parseInt(form.get('cedula'), 10),
        alias: form.get('apodo'),
        phone: form.get('telefono'),
        email: form.get('correo')
      }

    if (method == 'POST') { /** Post new data to DB */

      const total = await User.countDocuments()
      
      data.cod = parseInt((total + 1), 10)
      const user = new User(data)

      if (isNaN(data.cod) || isNaN(data.cid)) {
        const err = new Error("Invalid numeric fields")
        err.status = 400
        throw err
      }

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

      if (isNaN(data.cod) || isNaN(data.cid)) {
        const err = new Error("Invalid numeric fields")
        err.status = 400
        throw err
      }

      await User.updateOne({ _id: form.get('id') }, data)

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'User modified!', data })
      }

    }
    
    if (method == 'DELETE') { /** Delete element by ID */
      
      await User.deleteOne({ _id: form.get('id') })

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'User deleted' })
      }
    }

  } catch(e) {
    return {
      statusCode: e.status || 500,
      body: JSON.stringify({ error: e.message })
    }
  }

}

export {
  handler
}