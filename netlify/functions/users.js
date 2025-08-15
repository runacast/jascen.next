import { connectDB } from '../../src/lib/db.js'
import User from '../../src/models/User.js'

const handler = async (event) => {

  try{

    await connectDB()
    const method = event.httpMethod

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
      const data = JSON.parse(event.body)
      
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

      const data = JSON.parse(event.body), id = data.id
      delete data.id

      await User.updateOne({ _id: id }, data)

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