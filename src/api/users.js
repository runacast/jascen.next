import { MongoClient } from 'mongodb'

const mongoClient = new MongoClient(process.env.MONGODB_URI)
const clientPromise = mongoClient.connect()

const handler = async function(event){

  try {
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE)

    const collection = database.collection(process.env.MONGODB_COLLECTION)

    const users = await collection.find({}).toArray()
    const user = {
      cod: users.length + 1,
      surnames: 'Jaminez',
      names: 'Darwin',
      alias: '""',
      cid: 230409494,
      phone: '039382838',
      email: '',
      status: true
    }

    const resp = await collection.insertOne(user)

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(users)
    }

  }catch(error){
    return { statusCode: 500, body: error.toString() }
  }

}

export {
  handler
}