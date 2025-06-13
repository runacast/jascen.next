'use server'

import mongo from '@/api/mongodb'
import { ObjectId } from 'mongodb';

export async function get(form = undefined){

    const db = await mongo()

    if (db.statusCode == 500) {
        console.warn("Error fail connection mongoDB.");
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
    let response
    const db = await mongo()

    if(db.statusCode == 500){
        return {error:"Error fail connection mongoDB."}
    }
    
    const collection = db.collection('users'),
    total = await collection.countDocuments()
    
    let user = {
        cod: form.get('codigo'),
        surnames: form.get('apellidos'),
        names: form.get('nombres'),
        alias: form.get('apodo'),
        cid: form.get('cedula_id'),
        phone: form.get('telefono'),
        email: form.get('correo'),
        status: true
    }
    
    if(form.get('id')){ // Update user
        response = await collection.updateOne({ _id: new ObjectId(form.get('id')) },{ $set: user })
    }else{ // Add new user
        user.cod = total + 1
        response = await collection.insertOne(user)
    }

    return {
        result: `Usuario ${user.cod} creado.`
    }
}

export async function del(form){

    let response
    
    const db = await mongo()

    if(db.statusCode == 500){
        return {error:"Error fail connection mongoDB."}
    }

    const collection = db.collection('users')
    response = await collection.deleteOne({ _id: new ObjectId(form.get('id')) })

    return {
        deletes : response.deletedCount
    }
}