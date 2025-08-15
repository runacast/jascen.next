import { connectDB } from '../../src/lib/db.js'
import User from '../../src/models/User.js'

export default async (req, context) => {
  
  try{
    
    const form = await req.formData()

    form.set('name', "fruit")
    
    return new Response(JSON.stringify({"message":`any ${form.get('name')}`}))

  } catch(e) {
    return new Response("error")
  }
}