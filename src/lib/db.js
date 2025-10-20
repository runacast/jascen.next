import mongoose from 'mongoose'

const connect = mongoose.connection

export const connectDB = async () => {

  if (connect.readyState >= 1) return

  connect.on('error', (error) => {
    console.log('Mongo Connection Error: ' + error)
  })

  return mongoose.connect(process.env.MONGODB_URI)
  
}