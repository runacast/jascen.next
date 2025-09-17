/**
 * Template user JSX
 */
'use client'

import { useEffect, useState, useRef } from 'react'
import Modal from '@/components/admin/users/Modal'
import Link from 'next/link'

export default function Template() {

    const formRef = useRef(null), 
    [users, setUsers] = useState([]),
    [key, setKey] = useState(null), /** Set key list */
    [userData, setUserData] = useState({}), /** set data to user */
    [loading, setLoading] = useState(true), /** Set display loading animation */
    [visible, setVisible] = useState(false), /** Set modal visibility display */
    [visiblePay, setVisiblePay] = useState(false)

    useEffect(() => { /** Get users list */

        const fetchUsers = async () => {
            
            try {

                const response = await fetch('/api/users', {method:'GET'}),
                data = await response.json()

                if(data.error){
                    throw new Error(data.error)
                }
                
                setUsers(data)

            } catch (e) {
                alert(e.message)
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
                throw new Error(response.error)
            }
            
            const result = await response.json() /** Fetch get response */

            if(form.get('registrar_propiedad')){ /** Register main own property */

                await fetch('/api/properties', {
                    method: 'POST',
                    body: JSON.stringify({
                        "user_id": result.data._id,
                        "title": form.get('property_title') ? form.get('property_title') : 'Casa 1',
                        "address": form.get('property_address') ? form.get('property_address') : 'Centro'
                    })
                })

            }
            
            setVisible(false)

            if(userData._id){ /** Modfied element on Array */
                users[key] = result.data
            }else{ /** Add new element data to Array */
                users.push(result.data)
            }
            
            setUsers(users) /** Change users list */

        }catch(err){
            alert(err.message)
        }

    },handleDelete = async () => { /** Delete button */
        
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
    },handleSearch = async (e) => {
        
        try {

            const form = new FormData(formRef.current) /** Setting search params */
            if(form.get('key') == '-') formRef.current['value'].value = null
            const params = new URLSearchParams(Object.fromEntries(form.entries())),
                response = await fetch(`/api/users${(form.get('key') == '-' ? '' : '?'+params)}`, { method: 'GET' })

            if (!response.ok) {
                throw new Error(response.error)
            }

            const users = await response.json()

            setUsers(users) /** Update users from useState */

        } catch (e) {
            alert(e.message)
        }
    },setModal = (index,data) => { /* Set modal state open or close and key list */
        setKey(index)
        setUserData(data) /** Setting user data on form */
        setVisible(true)
    }

    return <>
        <form ref={formRef} className='form'>
            <div className='row'>
                <fieldset className='field-group col-10'>
                    <input type='text' name='value' className='input-attach' placeholder='Ingresa busqueda' onKeyUpCapture={handleSearch} />
                    <select className='input-attach' name='key' onChange={handleSearch}>
                        <option value={'-'}>- Buscar por -</option>
                        <option value={'identificacion'}>Cédula</option>
                        <option value={'codigo'}>Código</option>
                        <option value={'apellidos'}>Apellidos</option>
                        <option value={'nombres'}>Nombres</option>
                        <option value={'alias'}>Apodo / Institución</option>
                    </select>
                </fieldset>
                <fieldset className='field-group col-2'>
                    <button type='button' onClick={() => {
                        setModal(null, {})
                    }} className='right btn-panel'>Añadir usuario</button>
                </fieldset>
            </div>
        </form>
        <hr />
        <div className='v-overflow'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Apellidos y nombres</th>
                        <th>Apodo / Comercio</th>
                        <th>Cédula / RUC</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <tr><td colSpan={6}>Cargando usuarios...</td></tr> : users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.cod}</td>
                            <td><a href='#' onClick={() => setModal(index, user)}>{`${user.surnames} ${user.names}`}</a></td>
                            <td>{user.alias}</td>
                            <td><Link href={`/admin/payments?cid=${user.cid}`} target='_blank'>{user.cid}</Link></td>
                            <td>{user.active ? "activo" : "inactivo"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {visible && <Modal data={userData} setModal={(val) => setVisible(val)} submit={handleSubmit} _delete={handleDelete} />}
    </>
}