'use server'

import mongo from '@/api/mongodb'

export async function get(form) {

    const db = await mongo()

    if (db.statusCode == 500) {
        console.warn("MongoDB connection skipped in Netlify build")
        return []
    }

    const collection = db.collection('users')

    if (form) {
        return await collection.findOne(form)
    }

    return await collection.find({}).toArray()
    
}

export async function dir(){
    
}