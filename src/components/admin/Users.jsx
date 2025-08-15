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
        data = Object.fromEntries(form.entries()),
        methodType = form.get('id') ? 'PUT' : 'POST', /** POST add and PUT modify */
        user = { /** Format user data */
            _id: users[key]._id,
            cod: form.get('codigo'),
            surnames: form.get('apellidos'),
            names: form.get('nombres'),
            alias: form.get('apodo'),
            cid: form.get('cedula'),
            active: users[key].active
        }

        try{
            
            const response = await fetch('/api/users', {
                method: methodType,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if(!response.ok){
                throw new Error('Error en el servidor')
            }
            
            const result = await response.json() /** Fetch get response */
            console.log(result)
            setVisible(false)
            if(methodType == 'PUT'){ /** Modfied element on Array */
                users[key] = user
            }else
                if(methodType == 'POST'){ /** Add new element data to Array */
                    users.push(result.data)
                }
            
            setUsers(users) /** Change users list */

        }catch(err){
            alert('Ocurrió un error.')
        }

    },
    
    handleDelete = async () => {
        
        if(!confirm('¿Estás seguro de que quieres eliminar este usuario?')){
            return
        }
        
        try {
            
            const response = await fetch('/api/users', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id : userData._id })
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

    return <div className='v-overflow'>
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
                    setUserData({})
                    setVisible(true)
                }} className='right btn-panel'>Añadir usuario</button>
            </div>
        </div>
        <hr/>
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
                        <td><a href='#' onClick={() => setModal(index,user)}>{`${user.surnames} ${user.names}`}</a></td>
                        <td>{user.alias}</td>
                        <td>{user.cid}</td>
                        <td>{user.active ? "activo" : "inactivo"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        {visible && <Modal data={userData} setModal={(val) => setVisible(val)} submit={handleSubmit} _delete={handleDelete} /> }
    </div>
}