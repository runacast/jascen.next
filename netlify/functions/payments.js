import { connectDB } from '../../src/lib/db'
import Payment from '../../src/models/Payment'

const handler = async (event) => {

    try{
      
      await connectDB()
      const method = event.httpMethod

      if (method == 'GET') {

        const params = new URLSearchParams(event.rawUrl.split('?')[1]),
        filter = {},
        key = params.get('key') || '_id',
        value = params.get('value') || null,
        start = params.get('page') || 1,
        limit = params.get('limit') || 0,
        skip = (start - 1) * limit

        if (value) filter[key] = value

        const payments = await Payment.find(filter).skip(skip).limit(limit)

        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(payments)
        }
      
      }

    }catch(err){
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server error, request not found.' })
      }
    }

}

export { handler }