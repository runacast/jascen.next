import crypto from 'crypto'

const secret = 'process.env.SECRET_PHRASE', 
salt = 'my-salt',
key = crypto.scryptSync(secret, salt, 32),
iv = crypto.randomBytes(12)

export function encrypt(text){
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return {
    data: encrypted.toString('hex'),
    iv: iv.toString('hex'),
    tag: tag.toString('hex'),
  }
}

export function decrypt({data, iv, tag}){
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'))
  decipher.setAuthTag(Buffer.from(tag, 'hex'))
  const decrypted = decipher.update(Buffer.from(data, 'hex'), 'binary', 'utf8') + decipher.final('utf8')
  return decrypted
}