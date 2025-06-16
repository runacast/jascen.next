import { MongoClient } from 'mongodb'

const mongoClient = new MongoClient(process.env.MONGODB_URI)
const clientPromise = mongoClient.connect()

const handler = async function(event){

  try {
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE)

    const collection = database.collection(process.env.MONGODB_COLLECTION)

    const users = await collection.find({}).toArray()

    return {
        body: JSON.stringify(users)
    }

  }catch(error){
    return { statusCode: 500, body: error.toString() }
  }

}

export {
  handler
}