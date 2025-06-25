import Form from 'next/form'
import UserModal from '@/components/admin/users/UserModal'
import UsersClient from '@/components/admin/users/UsersClient'

export default async function adminUsers() {
    
    return <>
        <UserModal open={false}><button type='button' className='btn btn-form'>Añadir usuario</button></UserModal>
        <Form className='form'>
            <fieldset>
                <div className='field-group'>
                    <input type='text' name='value' className='input-attach' />
                    <button type='submit' className='input-attach btn btn-form'>Buscar</button>
                </div>
            </fieldset>
        </Form>
        <div className='v-overflow'>
            <UsersClient></UsersClient>
        </div>
    </>
}