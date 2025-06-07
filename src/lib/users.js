'use server'

import fs from 'fs'
import path from 'path'
import { encrypt, decrypt } from '@/lib/crypto'

export async function get(form, field = '_id'){

    const fileUsersPath = path.join(process.cwd(), 'src', 'local', 'users.json')
    let users = []

    if(fs.existsSync(fileUsersPath)){
        const content = JSON.parse(fs.readFileSync(fileUsersPath, 'utf8'))
        users = JSON.parse(decrypt(content))
    }

    if(form){

        const fieldVal = form.get(field),
        index = users.findIndex( user => user._id === fieldVal || user.cod === fieldVal || user.cid === fieldVal )
        
        if(users[index]) return users[index]
        return {}
    }
    
    return users
}

export async function post(form) {

    /* Users */
    const fileUsersPath = path.join(process.cwd(), 'src', 'local', 'users.json')
    let users = []

    if(fs.existsSync(fileUsersPath)){
        users = JSON.parse(decrypt(JSON.parse(fs.readFileSync(fileUsersPath, 'utf8'))))
    }
    
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
        const index = users.findIndex(data => data._id === form.get('id'))
        users[index] = user
    }else{ // Add new user
        user._id = crypto.randomUUID()
        user.cod = users.length + 1
        users = users.concat(user)
    }

    const encryptUsers = encrypt(JSON.stringify(users, null, 2))
    fs.writeFileSync(fileUsersPath, JSON.stringify(encryptUsers))

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