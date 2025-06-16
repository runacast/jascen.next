import { MongoClient } from 'mongodb'

const mongoClient = new MongoClient(process.env.MONGODB_URI)
const clientPromise = mongoClient.connect()

export default async function(event){

  try {
    const database = (await clientPromise).db(process.env.DBNAME)

    const collection = database.collection('users')

    const users = await collection.find({}).toArray()

    return users
    
  }catch(error){
    return { statusCode: 500, body: error.toString() }
  }

}