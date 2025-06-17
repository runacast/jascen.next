import Form from 'next/form'
import User from '@/components/admin/users/User'

export default async function adminUsers({params, searchParams}) {

    let users = [], message
    
    const response = await fetch('/.netlify/functions/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    if(!response.ok){
        message = "Error en el servidor"
    }
    
    users = (await response).json()
    
    return <>
        <User open={false}><button type='button' className='btn btn-form'>Añadir usuario</button></User>
        <Form className='form' action={get}>
            <fieldset>
                <div className='field-group'>
                    <input type='text' name='value' className='input-attach' />
                    <button type='submit' className='input-attach btn btn-form'>Buscar</button>
                </div>
            </fieldset>
        </Form>
        <Form className='form'>
            <div className='v-overflow'>
                { users.length ? (<div>HOLA</div>) : <div>{message}</div> }
            </div>
        </Form>
    </>
}