import { MongoClient, ObjectId } from 'mongodb'

const mongoClient = new MongoClient(process.env.MONGODB_URI)
const clientPromise = mongoClient.connect()

export async function list(start = 0, limit = 0){

    const client = await clientPromise
    const database = client.db(process.env.MONGODB_DATABASE)

    const collection = database.collection('users')

    const result = await collection.find({}).skip(start).limit(limit).toArray()

    return result

}