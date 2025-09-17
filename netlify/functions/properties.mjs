import { connectDB } from '../../src/lib/db.js'
import Property from '../../src/models/Property.js'
import he from 'he'

export default async (req, context) => {

    try{

        await connectDB()

        const params = context.url.searchParams
        
        if(req.method == 'GET'){

            let result, filter = [],
            id = params.get('id'),
            user_id = params.get('userId'),
            options = params.get('options')

            if (id) {
                result = Property.findById(id).select(options.replace(',',' '))
            }else if (user_id) {
                result = Property.findOne({user_id}).select(options.replace(',',' '))
            }else{
                
                filter.push({
                    $addFields: {
                        _id: { $toString: "$_id" }
                    }
                }, {
                    $addFields: {
                        user_id: { $toString: "$user_id" }
                    }
                })

                result = Property.aggregate(filter)
            }

            return new Response(
                JSON.stringify(await result),
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            )

        }else

            /** Get form data */

        if(req.method == 'POST'){

            const {user_id, title, address} = await req.json()

            const property = new Property({
                user_id,
                title: he.escape(title).trim(),
                address: he.escape(address).trim()
            })

            await property.save()

            return new Response(
                JSON.stringify({ message: 'Property added', data: property.toObject() }),
                {
                    status: 201,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            )

        }else

            /** Update property info */
            
        if(req.method == 'PUT'){

            const { _id, user_id, title, address } = await req.json(),
                data = {
                    title: he.escape(title).trim(),
                    address: he.escape(address).trim(),
                    updated_at: Date.now()
                }
            
            await Property.updateOne({_id}, data)

            return new Response(
                JSON.stringify({ message: 'Property updated', data: {_id, ...data} }),
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            )

        }else

        if(req.method == 'DELETE'){

        }

    }catch(e){

    }

}