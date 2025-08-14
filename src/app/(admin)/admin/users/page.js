import Modal from '@/components/admin/users/Modal'
import UsersClient from '@/components/admin/users/UsersClient'

export default async function adminUsers() {
    
    return <div className='ses-panel'>
        <div className='row'>
            <div className='col-10'>
                <form className='form'>
                    <fieldset className='field-group'>
                        <input type='text' name='value' className='input-attach' placeholder='Ingresa busqueda' />
                        <select className='input-attach' defaultValue={0}>
                            <option>- Buscar por -</option>
                            <option value='cedula'>Cédula</option>
                            <option value='codigo'>Código</option>
                            <option value='nombresApellidos'>Nombres o Apellidos</option>
                            <option value='apodo'>Apodo</option>
                        </select>
                    </fieldset>
                </form>
            </div>
            <div className='col-2'>
                <Modal show={false}><button type='button' className='right btn-panel'>Añadir usuario</button></Modal>
            </div>
        </div>
        <hr></hr>
        <div className='v-overflow'>
            <UsersClient></UsersClient>
        </div>
    </div>
}