import { connectDB } from '../../src/lib/db.js'
import User from '../../src/models/User.js'

export default async (req, context) => {
  return new Response("Hello, world!");
}