import { connectDB } from '../../src/lib/db.js'
import User from '../../src/models/User.js'

export default async (req, context) => {
  
  try{

    const {test} = await req.json()
    
    await connectDB()
    
    return new Response(JSON.stringify({"message":`any: ${test}`}))

  } catch(e) {

  }
}