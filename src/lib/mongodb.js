import { MongoClient } from 'mongodb'

export default async function(){

  let client, clientPromise

  if(process.env.NETLIFY){
    console.warn("MongoDB connection skipped in Netlify build");
    return null;
  }

  const uri = process.env.MONGODB_URI
  const options = {}

  if (!uri) {
    throw new Error('Error uri not defined.')
  }

  if (process.env.APP_RELEASE === 'development') {
    // Guardar conexión en caché
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    // En producción sin caché global
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }

  if(clientPromise){
    return (await clientPromise).db('jascen_man')
  }

  return null
}