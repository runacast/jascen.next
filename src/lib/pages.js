import fs from 'fs'
import path from 'path'

export function get(slug){

    const filePath = path.join(process.cwd(), 'src', 'local', 'pages', slug + '.json')
    
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'))
    }
    
    return null
}