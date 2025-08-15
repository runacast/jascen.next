import { connectDB } from '../../src/lib/db.js'
import User from '../../src/models/User.js'

export default async (req, context) => {

  try {

    await connectDB() // Wait a connection to database

    if (req.method == 'GET') { // Get datalist from db

      const params = context.url.searchParams,
        filter = {},
        key = params.get('key') || '_id',
        value = params.get('value') || null,
        page = parseInt(params.get('page'), 10) || 1,
        limit = parseInt(params.get('limit'), 10) || 0,
        skip = (page - 1) * limit

      if (value) {
        filter[key] = value
      }

      const users = await User.find(filter).skip(skip).limit(limit), // Query collection
      result = users.map(user => ({
        ...user.toObject(),
        _id: user._id.toString()
      }))

      return new Response(
        JSON.stringify(result),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )

    }

    const form = await req.formData(), // Request FormData
      data = { /** Format user data */
        cod: parseInt(form.get('codigo'), 10),
        surnames: form.get('apellidos'),
        names: form.get('nombres'),
        cid: parseInt(form.get('cedula'), 10),
        alias: form.get('apodo'),
        phone: form.get('telefono'),
        email: form.get('correo')
      }

    if (req.method == 'POST') { /** Post new data to DB */

      const total = await User.countDocuments()
      
      data.cod = parseInt((total + 1), 10)
      const user = new User(data)

      if (isNaN(data.cod) || isNaN(data.cid)) {
        const err = new Error("Invalid numeric fields")
        err.status = 400
        throw err
      }

      await user.save()

      return new Response(
        JSON.stringify({ message: 'User inserted', data: user.toObject() }),
        {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )

    }

    if (req.method == 'PUT') { /** Update data to collection on DB */

      if (isNaN(data.cod) || isNaN(data.cid)) {
        const err = new Error("Invalid numeric fields")
        err.status = 400
        throw err
      }

      await User.updateOne({ _id: form.get('id') }, data)

      return new Response(
        JSON.stringify({ message: 'User modified!', data }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
          }
        }
      )

    }
    
    if (req.method == 'DELETE') { /** Delete element by ID */

      await User.deleteOne({ _id: form.get('id') })

      return new Response(
        JSON.stringify({ message: 'User deleted' }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    }

  } catch(e) {
    return new Response(
      JSON.stringify({ error: e.message }),
      {
        status: e.status || 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
  }

}

