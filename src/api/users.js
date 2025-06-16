import { MongoClient, ObjectId } from 'mongodb'

const mongoClient = new MongoClient(process.env.MONGODB_URI)
const clientPromise = mongoClient.connect()

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

export const handler = async (event) => {

  try {

    const method = event.httpMethod, 
    database = (await clientPromise).db(process.env.MONGODB_DATABASE),
    collection = database.collection(process.env.MONGODB_COLLECTION),
    total = await collection.countDocuments()

    switch (method) {
      case 'GET':

        let users = await collection.find({}).toArray()

        if (users) {
          users = users.map(user => ({
            ...user,
            _id: user._id.toString()
          }))
        }

        return {
          statusCode: 200,
          headers,
          get_string: JSON.stringify(event.body),
          body: JSON.stringify(users)
        }

      case 'POST':

        const data = JSON.parse(event.body)
        await collection.insertOne(data)

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({ message: 'POST received', data })
        }

      case 'PUT':
        const updateData = JSON.parse(event.body)
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'PUT update', updateData })
        }

      case 'DELETE':
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'DELETE request handled' })
        }

      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ error: 'Method Not Allowed' })
        }
    }

  }catch(error){
    return { statusCode: 500, body: error.toString() }
  }

}