import MongoClient from 'mongodb'

const mongoClient = new MongoClient(process.env.MONGODB_URI)

const clientPromise = mongoClient.connect()

const handler = async (event) => {
    try {
        const database = (await clientPromise).db('jascen_man')
        const collection = database.collection('users')
        // Function logic here ...
        const results = await collection.find({}).limit(10).toArray()
        return {
            statusCode: 200,
            body: JSON.stringify(results),
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

export {
    handler
}