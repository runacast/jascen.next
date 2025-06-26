import Modal from '@/components/admin/users/Modal'
import UsersClient from '@/components/admin/users/UsersClient'

export default async function adminUsers() {
    
    return <div className='ses-panel'>
        <form className='form'>
            <fieldset className='row'>
                <div className='field-group col-10'>
                    <input type='text' name='value' className='input-attach' placeholder='Ingresa busqueda' />
                    <select className='input-attach' defaultValue={0}>
                        <option>- Buscar por -</option>
                        <option value='apellidos'>Apellidos</option>
                        <option value='nombres'>Nombres</option>
                        <option value='apodo'>Apodo</option>
                        <option value='codigo'>Código</option>
                    </select>
                </div>
                <div className='field-group col-2'>
                    <Modal show={false}><button type='button' className='btn btn-form'>Añadir usuario</button></Modal>
                </div>
            </fieldset>
        </form>
        <hr></hr>
        <div className='v-overflow'>
            <UsersClient></UsersClient>
        </div>
    </div>
}