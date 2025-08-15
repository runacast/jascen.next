import { connectDB } from '../../src/lib/db.js'
import User from '../../src/models/User.js'

export default async (event, context) => {
  
  try{
    
    await connectDB()

    const { key } = context.params
    
    return {
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      body: JSON.stringify({ message: "Hello World", key }),
      statusCode: 200
    }

  } catch(e) {

  }
}