'use server'

import fs from 'fs'
import path from 'path'
import mongo from '@/lib/mongodb'
import { encrypt, decrypt } from '@/lib/crypto'

export async function get(form = undefined){
    
    try{
        const db = await mongo()
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

    }catch(e){
        console.error(e)
    }

    
}

export async function post(form) {

    /* Users */
    const client = await clientPromise
    const db = client.db('jascen_man')
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

    const fileUsersPath = path.join(process.cwd(), 'src', 'local', 'users.json'),
    users = JSON.parse(decrypt(JSON.parse(fs.readFileSync(fileUsersPath, 'utf8')))),
    index = users.findIndex(data => data._id === form.get('id'))

    if(users[index]){
        users.splice(index, 1)
        fs.writeFileSync(fileUsersPath, JSON.stringify(encrypt(JSON.stringify(users, null, 2))))
    }

    return {
        result : 'Eliminado'
    }
}