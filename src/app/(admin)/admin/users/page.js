import Form from 'next/form'
import User from '@/components/admin/users/User'
import { list } from '@/lib/users'

export default async function adminUsers() {

    let users = await list(0, 10)
    let message = null
    

    users = users.map(user => ({
        ...user,
        _id: user._id.toString()
    }))
    
    return <>
        <User open={false}><button type='button' className='btn btn-form'>Añadir usuario</button></User>
        <Form className='form'>
            <fieldset>
                <div className='field-group'>
                    <input type='text' name='value' className='input-attach' />
                    <button type='submit' className='input-attach btn btn-form'>Buscar</button>
                </div>
            </fieldset>
        </Form>
        <Form className='form'>
            <div className='v-overflow'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Apellidos y nombres</th>
                            <th>Apodo</th>
                            <th>Cédula</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.cod}</td>
                                <td><User open={false} user={user}><a href='#'>{user.surnames} {user.names}</a></User></td>
                                <td>{user.alias}</td>
                                <td>{user.cid}</td>
                                <td>{user.status ? "activo" : "inactivo"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Form>
    </>
}