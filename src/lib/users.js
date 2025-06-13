'use server'

import fs from 'fs'
import path from 'path'
import mongo from '@/lib/mongodb'
import { encrypt, decrypt } from '@/lib/crypto'

export async function get(form = undefined){
    
    const db = await mongo()

    if (!db) {
        console.warn("MongoDB connection skipped in Netlify build");
        return []
    }

    const collection = db.collection('users')
    if (form) {
        const user = await collection.findOne(form)

        if (user) return {
            ...user,
            _id: user._id.toString()
        }
        return user
    }

    const users = await collection.find({}).toArray()

    if (users) return users.map(user => ({
        ...user,
        _id: user._id.toString()
    }))

    return users
    
}

export async function post(form) {

    /* Users */
    const db = await mongo()

    if(!db){
        return {error:"Mongo not available"}
    }
    
    const collection = db.collection('users')
    const users = await collection.find({}).toArray()
    
    let user = {
        _id: form.get('id'),
        cod: form.get('codigo'),
        surnames: form.get('apellidos'),
        names: form.get('nombres'),
        alias: form.get('apodo'),
        cid: form.get('cedula_id'),
        phone: form.get('telefono'),
        email: form.get('correo'),
        status: true
    }
    
    if(user._id){ // Update user
        
    }else{ // Add new user
        user.cod = users.length + 1
        await collection.insertOne(user)
    }

    return {
        result: `Usuario "${users.length + 1}" creado.`
    }
}

export async function del(form){

    return {
        result : 'Eliminado'
    }
}