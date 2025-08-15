import { connectDB } from '../../src/lib/db.js'
import User from '../../src/models/User.js'

export default async (req, context) => {
  
  try{

    console.log(req)
    
    return new Response(JSON.stringify({"message":`any`}))

  } catch(e) {
    return new Response("error")
  }
}