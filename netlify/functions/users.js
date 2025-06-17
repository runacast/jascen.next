import { MongoClient, ObjectId } from 'mongodb'

const mongoClient = new MongoClient(process.env.MONGODB_URI)
const clientPromise = mongoClient.connect()

export const handler = async (event) => {
  
  try {
    const method = event.httpMethod
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DATABASE)
    const collection = db.collection(process.env.MONGODB_COLLECTION)

    switch (method) {
      case 'GET': {

        const users = await collection.find({}).toArray()
        const sanitizedUsers = users.map(user => ({
          ...user,
          _id: user._id.toString()
        }))
        return {
          statusCode: 200,
          headers: { 
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE' 
          },
          body: JSON.stringify(sanitizedUsers)
        }

      } case 'POST': {

        if (!event.body) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Empty request body' })
          }
        }

        const data = JSON.parse(event.body)
        await collection.insertOne(data)

        return {
          statusCode: 201,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ message: 'User inserted', data })
        }

      } case 'PUT': {
        const updateData = JSON.parse(event.body)
        if (!updateData._id) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing _id for update' })
          }
        }

        const { _id, ...fields } = updateData
        const result = await collection.updateOne(
          { _id: new ObjectId(_id) },
          { $set: fields }
        )

        return {
          statusCode: 200,
          headers: { 
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*' 
          },
          body: JSON.stringify({ message: 'User updated', result })
        }
      } case 'DELETE': {
        const { _id } = JSON.parse(event.body || '{}')
        if (!_id) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing _id for deletion' })
          }
        }

        const result = await collection.deleteOne({ _id: new ObjectId(_id) })

        return {
          statusCode: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ message: 'User deleted', deletedCount: result.deletedCount })
        }
      } default:
        return {
          statusCode: 405,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
           },
          body: JSON.stringify({ error: 'Method Not Allowed' })
        }
      }
      
    } catch (error) {

      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message || 'Internal Server Error' })
      }

    }

}
