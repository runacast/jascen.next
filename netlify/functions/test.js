// pages/api/users/with-properties.js
import mongoose from 'mongoose'
import { connectDB } from '../../src/lib/db.js';
import User from '../../src/models/User.js';
import Property from '../../src/models/Property.js'; // IMPORTA para asegurarte que está registrado

export default async function handler(req, res) {
  if (req.method !== 'GET') return new Response(JSON.stringify({ message: 'Method not allowed' }),{status: 405});

  await connectDB();

  console.log(req.query)

  const userId = '68c487a559bf1b9d996e768d';
  if (!userId) return new Response(JSON.stringify({ message: 'userId is required' }),{status: 400});
  if (!mongoose.Types.ObjectId.isValid(userId)) return new Response(JSON.stringify({ message: 'Invalid userId' }),{status:400});

  try {
    // Opción A: Populate virtual (sin lean para debug)
    const user = await User.findById(userId)
      .populate({ path: 'properties', select: 'name created_at' })
      .exec();

    if (!user) return new Response(JSON.stringify({ message: 'User not found' }),{status: 404});

    // `new Response(json` llamará a toJSON() del documento, y como activamos virtuals, aparecerán.
    return new Response(JSON.stringify({ user }),{status:200});

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error fetching user with properties', error: error.message }),{status:500});
  }
}
