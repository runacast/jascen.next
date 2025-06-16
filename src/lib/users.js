'use server'

import mongo from '@/api/mongodb'
import { MongoClient } from 'mongodb'

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
    /*let response
    const db = await mongo()

    if (db.statusCode == 500) {
        return {error:"Error fail connection mongoDB."}
    }
    
    const collection = db.collection('users'),
    total = await collection.countDocuments()*/
    const client = new MongoClient(process.env.MONGODB_URI)
    const db = (await client.connect()).db()

    const collection = db.collection(process.env.MONGODB_COLLECTION)

    const user = {
      cod: 23,
      surnames: 'Jaminez',
      names: 'Darwin',
      alias: '""',
      cid: 230409494,
      phone: '039382838',
      email: '',
      status: true
    }

    const resp = await collection.insertOne(user)
    
    /*let response, user = {
        cod: parseInt(form.get('codigo'), 10),
        surnames: form.get('apellidos'),
        names: form.get('nombres'),
        alias: form.get('apodo'),
        cid: parseInt(form.get('cedula_id'), 10),
        phone: form.get('telefono'),
        email: form.get('correo'),
        status: true
    }
    
    if(form.get('id')){ // Update user
        response = await collection.updateOne({ _id: new ObjectId(form.get('id')) },{ $set: user })
    }else{ // Add new user
        user.cod = total + 1
        response = await collection.insertOne(user)
    }*/

    return {
        result: `Usuario creado.`
    }
}

export async function del(form){

    /*let response
    
    const db = await mongo()

    if(db.statusCode == 500){
        return {error:"Error fail connection mongoDB."}
    }

    const collection = db.collection('users')
    response = await collection.deleteOne({ _id: new ObjectId(form.get('id')) })

    return {
        deletes : response.deletedCount
    }*/
}