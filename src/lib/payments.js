'use server'

import fs from 'fs'
import path from 'path'
import { encrypt, decrypt } from '@/lib/crypto'

export async function get(form, field) {

    const date = new Date(), filePath = path.join(process.cwd(), 'src', 'local', 'payments', date.getFullYear() + '.json')
    let list = []

    if (fs.existsSync(filePath)) {

        //const content = decrypt(JSON.parse(fs.readFileSync(filePath, 'utf8')))
        //list = JSON.parse(content)
    }

    return list
}

export async function dir(){
    
}