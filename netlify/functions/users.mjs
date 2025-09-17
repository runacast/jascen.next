import { connectDB } from '../../src/lib/db.js'
import User from '../../src/models/User.js'
import '../../src/models/Property.js'
import he from 'he'

export default async (req, context) => {

  try {

    await connectDB() // Wait a connection to database

    if (req.method == 'GET') { // Get datalist from db

      let filter = [], users, _page, _limit

      const fields = {
        "id": "_id",
        "codigo": "cod",
        "identificacion": "cid",
        "apellidos": "surnames",
        "nombres": "names",
        "alias": "alias"
      },
        params = context.url.searchParams,
        key = params.get('key') || '_id',
        value = params.get('value') || null,
        id = params.get('id'), // Find one document by _id
        cod = parseInt(params.get('codigo'), 10), // Find one document by cod
        cid = parseInt(params.get('identificacion'), 10), // Find one document by id
        opt = params.get('propiedades'),
        page = _page = parseInt(params.get('page'), 10) ? _page : 1,
        limit = _limit = parseInt(params.get('limit'), 10) ? _limit : 0,
        skip = (page - 1) * limit // index page

      if (fields[key] && value) { /** Serach with filter by field */

        filter.push({ /** Convert Object _id to string readable */
          $addFields: {
            _id: { $toString: "$_id" }
          }
        },{
          $addFields: {
            key: { $toString: `$${fields[key]}` }
          }
        },{
          $match: {
            key: { $regex: `^${value}`, $options: 'i' }
          }
        })

        if (limit > 0) { /** filter by quanty document by page */
          filter.push({
            $skip: skip
          }, {
            $limit: limit
          })
        }

        users = User.aggregate(filter) /** Get result query collection */

      } else {

        if (id) {
          users = User.findById(id)
        } else
        if (cod) {
          users = User.findOne({cod})
        } else
        if (cid) {
          users = User.findOne({cid})
        }else{
          users = User.find({}).skip(skip).limit(limit)
        }

        if (opt) {
          users.populate('properties', opt.replace(',',' ')) /** Add ref property collection */
        }

      }

      /** Return json response */
      return new Response(
        JSON.stringify(await users),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )

    }

    /** Format data to POST and PUT */
    const form = await req.formData() // Request FormData

    if (req.method == 'POST') { /** Post new data to DB */

      const total = await User.countDocuments()

      const user = new User({ /** Format user data */
        cid: parseInt(form.get('identificacion'), 10),
        cod: total + 1,
        user_type: (he.escape(form.get('persona')).toLowerCase()).trim(),
        surnames: (he.escape(form.get('apellidos'))).trim(),
        names: (he.escape(form.get('nombres'))).trim(),
        alias: (he.escape(form.get('alias'))).trim(),
        phone: (he.escape(form.get('telefono'))).trim(),
        email: (he.escape(form.get('correo_electronico'))).trim()
      })

      if (isNaN(user.cod) || isNaN(user.cid)) {
        const err = new Error("Invalid numeric fields")
        err.status = 400
        throw err
      }

      await user.save()

      return new Response(
        JSON.stringify({ message: 'User inserted', data: user.toObject() }),
        {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )

    } else
      if (req.method == 'PUT') { /** Update data to collection on DB */

        const data = { /** Format user data */
          cid: parseInt(form.get('identificacion'), 10),
          cod: parseInt(form.get('codigo'), 10),
          user_type: (he.escape(form.get('persona')).toLowerCase()).trim(),
          surnames: (he.escape(form.get('apellidos'))).trim(),
          names: (he.escape(form.get('nombres'))).trim(),
          alias: (he.escape(form.get('alias'))).trim(),
          phone: (he.escape(form.get('telefono'))).trim(),
          email: (he.escape(form.get('correo_electronico'))).trim(),
          active: Boolean(Number(form.get('estado')))
        }

        if (isNaN(data.cid) || isNaN(data.cod)) {
          const err = new Error("Invalid numeric fields")
          err.status = 400
          throw err
        }

        const result = await User.updateOne({ _id: form.get('id') }, data)

        return new Response(
          JSON.stringify({ message: 'User modified!', data: { _id: form.get('id'), ...data } }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*'
            }
          }
        )

      } else
        if (req.method == 'DELETE') { /** Delete element by ID */

          await User.deleteOne({ _id: form.get('id') })

          return new Response(
            JSON.stringify({ message: 'User deleted' }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
              }
            }
          )
        }

  } catch (e) {
    return new Response(
      JSON.stringify({ error: e.message }),
      {
        status: e.status || 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
  }

}