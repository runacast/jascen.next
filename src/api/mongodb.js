import { MongoClient } from 'mongodb'

const mongoClient = new MongoClient(process.env.MONGODB_URI)
const clientPromise = mongoClient.connect()

export default async function(event){

  try {
    const database = (await clientPromise).db(process.env.DBNAME)
    return database
  }catch(error){
    return { statusCode: 500, body: error.toString() }
  }

}