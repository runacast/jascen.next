const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.MONGODB_URI)
let clientPromise = client.connect()

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  try {
    const data = JSON.parse(event.body)
    const db = (await clientPromise).db(process.env.MONGODB_DATABASE)
    const collection = db.collection(process.env.MONGODB_COLLECTION)

    const result = await collection.insertOne(data)

    return {
      statusCode: 201,
      body: JSON.stringify({ insertedId: result.insertedId }),
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    }
  }
}
