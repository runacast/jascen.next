import { connectDB } from '../../src/lib/db.js'
import User from '../../src/models/User.js'

export default async (req, context) => {
  const {key} = context.params
  return new Response({
    "title":key
  })
}