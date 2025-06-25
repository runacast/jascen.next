import { connectDB } from '../../src/lib/db'
import User from '../../src/models/User'

const handler = async (event) => {

  try {

    await connectDB()

    const users = await User.find({})

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(users)
    }

  }catch(err){
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error en el servidor', detail: err.message })
    }
  }
    
}

export {
    handler
}