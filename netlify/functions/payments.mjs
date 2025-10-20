import { connectDB } from '../../src/lib/db.js'
import Payment from '../../src/models/Payment.js'

export default async (req, context) => {
  
  try{
    
    await connectDB().catch((err) => {throw new Error(err)})

    const method = req.method

    if (method == 'GET') {
      
      let _start, _limit
      const params = new URLSearchParams(event.rawUrl.split('?')[1]),
        filter = {},
        key = params.get('key') || '_id',
        value = params.get('value') || null,
        start = _start = parseInt(params.get('page'), 10) ? _start : 1,
        limit = _limit = parseInt(params.get('limit'), 10) ? _limit : 0,
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
        body: JSON.stringify({ message: 'Payment received', data: payment.toObject() })
      }

    }
    
  }catch(err){
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error, request not found.' })
    }
  }

}