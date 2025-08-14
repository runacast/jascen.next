import { connectDB } from '../../src/lib/db.js'
import Payment from '../../src/models/Payment.js'

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

    if (method == 'POST') {

      const count = await Payment.countDocuments()
      const data = JSON.parse(event.body)

      const payment = new Payment({
        ide: parseInt(`${count}${data.ide}`),
        cid: data.cid,
        cod: data.cod,
        date: new Date(),
        paid: data.paid
      })
      
      await payment.save()

      return {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'Payment received' })
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