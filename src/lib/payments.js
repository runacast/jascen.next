'use server'

import fs from 'fs'
import path from 'path'
import mongo from '@/lib/mongodb'

export async function get(form) {

    try{

        const db = await mongo()

        if(!db){
            throw new Error("Mongo not available.")
            return []
        }

        const collection = db.collection('users')

        if (form) {
            return await collection.findOne(form)
        }

        return await collection.find({}).toArray()

    }catch(e){
        console.error(e)
    }
    
}

export async function dir(){
    
}