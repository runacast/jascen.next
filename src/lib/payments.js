'use server'

import mongo from '@/lib/mongodb'

export async function get(form) {

    const db = await mongo()

    if (!db) {
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