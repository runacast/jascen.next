'use server'

export async function get(form = undefined){
    
    /*if (form) {
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
        }))*/
    let payload = {}

    if(form){
        payload = Object.fromEntries(form.entries())
    }
    
    const response = await fetch('/.netlify/functions/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    
    if (!response.ok) throw new Error('Error get users')
    return await res.json()
    
}

export async function post(form) {

    if(form){
        payload = Object.fromEntries(form.entries())
    }

    const response = await fetch('/.netlify/functions/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (!response.ok) throw new Error('Error get users')
    return await res.json()

    /* Users */
    /*let response
    const db = await mongo()

    if (db.statusCode == 500) {
        return {error:"Error fail connection mongoDB."}
    }
    
    const collection = db.collection('users'),
    total = await collection.countDocuments()
    
    let user = {
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