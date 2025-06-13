import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
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

export default clientPromise