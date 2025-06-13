'use server'

import mongo from '@/api/mongodb'

export async function get(form) {

    const db = await mongo()

    if (db.statusCode == 500) {
        console.warn("MongoDB connection skipped in Netlify build")
        return []
    }

    const collection = db.collection('payments')

    if (form) {
        const payment = await collection.findOne(form)
        if (payment) return {
            ...payment,
            _id: payment._id.toString()
        }
        return payment
    }
    
    const payments = await collection.find({}).toArray()

    if (payments) return payments.map(user => ({
        ...payment,
        _id: payment._id.toString()
    }))

    return payments
}

export async function dir(){
    
}