'use server'

import fs from 'fs'
import path from 'path'
import clientPromise from '@/lib/mongodb'

export async function get(form) {

    const client = await clientPromise,
    db = client.db('jascen_man'),
    collection = db.collection('users')

    if(form){
        return await collection.findOne(form)
    }
    
    return await collection.find({}).toArray()
}

export async function dir(){
    
}