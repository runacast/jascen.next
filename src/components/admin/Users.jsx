/**
 * Template user JSX
 */
'use client'

import { useEffect, useState } from 'react'
import Modal from '@/components/admin/users/Modal'

export default function Template() {

    const [users, setUsers] = useState([]),
    [key, setKey] = useState(null), /** Set key list */
    [userData, setUserData] = useState({}), /** set data to user */
    [loading, setLoading] = useState(true), /** Set display loading animation */
    [visible, setVisible] = useState(false) /** Set modal visibility display */

    useEffect(() => { /** Get users list */

        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/users', {method:'GET'})
                const data = await res.json()
                setUsers(data)
            } catch (err) {
                console.error('error getting users: ', err)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    const handleSubmit = async (event) => { /* Submit data add or modify from modal form */

        event.preventDefault()

        const form = new FormData(event.target),
        methodType = userData._id ? 'PUT' : 'POST' /** POST add and PUT modify */

        try{

            if(userData._id) form.set('id', userData._id)
            
            const response = await fetch('/api/users', {
                method: methodType,
                body: form
            })

            if(!response.ok){
                console.log(response)
                throw new Error('Error en el servidor')
            }
            
            const result = await response.json() /** Fetch get response */
            
            setVisible(false)
            if(userData._id){ /** Modfied element on Array */
                console.log(result.data)
                users[key] = result.data
            }else{ /** Add new element data to Array */
                users.push(result.data)
            }
            
            setUsers(users) /** Change users list */

        }catch(err){
            alert(err.message)
        }

    },
    
    handleDelete = async () => {
        
        if(!confirm('¿Estás seguro de que quieres eliminar este usuario?')){
            return
        }
        
        try {

            const form = new FormData()
            form.set('id', userData._id)
            const response = await fetch('/api/users', {
                method: 'DELETE',
                body: form
            })

            if(!response.ok){
                throw new Error('Server error request.')
            }

            setVisible(false)
            setUsers(users.filter(user => user._id !== userData._id)) /** Reorder new Array without the element deleted */
            
        }catch(err){
            alert(err.message)
        }
    },

    setModal = (index,data) => { /* Set modal state open or close and key list */
        setKey(index)
        setUserData(data) /** Setting user data on form */
        setVisible(true)
    }

    return <>
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
                <button type='button' onClick={() => {
                    setModal(null, {})
                }} className='right btn-panel'>Añadir usuario</button>
            </div>
        </div>
        <hr />
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
                    {loading ? <tr><td colSpan={6}>Cargando usuarios...</td></tr> : users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.cod}</td>
                            <td><a href='#' onClick={() => setModal(index, user)}>{`${user.surnames} ${user.names}`}</a></td>
                            <td>{user.alias}</td>
                            <td>{user.cid}</td>
                            <td>{user.active ? "activo" : "inactivo"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {visible && <Modal data={userData} setModal={(val) => setVisible(val)} submit={handleSubmit} _delete={handleDelete} />}
        </div>
    </>
}