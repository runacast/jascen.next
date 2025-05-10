import fs from 'fs'
import path from 'path'

export default {
    get: function (dirname, slug) {
        const filePath = path.join(process.cwd(), 'src', 'local', dirname, slug + '.json')
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8')
            return JSON.parse(fileContent)
        }
        return ''
    }
}