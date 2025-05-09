import fs from 'fs'
import path from 'path'

exports.handler = async function(){
    const outpath = path.join('src', 'index', 'list.json')
    fs.writeFileSync(outpath, '{}')
}