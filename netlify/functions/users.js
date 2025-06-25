import Model from '../../src/models/User'

const handler = async (event) => {
  
  const User = await Model()

  try{

    const method = event.httpMethod

    if (method == 'GET') {

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'Get success!' })
      }

    }

    if (method == 'POST') {

      const total = await User.countDocuments()
      const data = JSON.parse(event.body)

      const user = new User({
        cod: total + 1,
        surnames: data.apellidos,
        names: data.nombres,
        cid: data.cedula,
        alias: data.apodo,
        phone: data.telefono,
        email: data.correo 
      })

      console.log("Guardando usuario...")
      await user.save()
      console.log("Usuario guardado.")

      return {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'User inserted' })
      }

    }

  }catch(e){
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error en el servidor' })
    }
  }

}

export {
  handler
}