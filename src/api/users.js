// /src/api/users.js (función de Netlify)

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
        // Obtener parámetros de búsqueda
        const searchValue = event.queryStringParameters?.search || ''
        
        let query = {}
        if (searchValue) {
          // Buscar en múltiples campos
          query = {
            $or: [
              { surnames: { $regex: searchValue, $options: 'i' } },
              { names: { $regex: searchValue, $options: 'i' } },
              { alias: { $regex: searchValue, $options: 'i' } },
              { cid: { $regex: searchValue, $options: 'i' } }
            ]
          }
        }
        
        const users = await collection.find(query).toArray()
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
      }

      case 'POST': {
        if (!event.body) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Empty request body' })
          }
        }

        const data = JSON.parse(event.body)
        
        // Mapear nombres de campos del formulario a la base de datos
        const userData = {
          cod: data.codigo ? parseInt(data.codigo) : null,
          surnames: data.apellidos,
          names: data.nombres,
          alias: data.apodo,
          cid: data.cedula_id,
          phone: data.telefono,
          email: data.correo,
          status: true, // Por defecto activo
          createdAt: new Date()
        }
        
        await collection.insertOne(userData)

        return {
          statusCode: 201,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ message: 'User inserted', data: userData })
        }
      }

      case 'PUT': {
        const updateData = JSON.parse(event.body)
        if (!updateData._id) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing _id for update' })
          }
        }

        const { _id, ...rawFields } = updateData
        
        // Mapear nombres de campos del formulario a la base de datos
        const fields = {
          cod: rawFields.codigo ? parseInt(rawFields.codigo) : null,
          surnames: rawFields.apellidos,
          names: rawFields.nombres,
          alias: rawFields.apodo,
          cid: rawFields.cedula_id,
          phone: rawFields.telefono,
          email: rawFields.correo,
          updatedAt: new Date()
        }
        
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
      }

      case 'DELETE': {
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
      }

      default:
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
    console.error('Database error:', error)
    return {
      statusCode: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message || 'Internal Server Error' })
    }
  }
}