/**
 * Template user JSX
 */
'use client'

import { useEffect, useState, useRef } from 'react'
import Modal from '@/components/admin/users/Modal'
import Link from 'next/link'

export default () => {

    const formRef = useRef(null), 
    [users, setUsers] = useState([]),
    [user_id, setUserId] = useState(NaN), /** set data to user */
    [loading, setLoading] = useState(true), /** Set display loading animation */
    [visible, setVisible] = useState(false) /** Set modal visibility display */

    useEffect(() => { /** Get users list */

        const fetchUsers = async () => {
            
            try {

                const response = await fetch('/api/users', {method:'GET'}),
                result = await response.json()

                if(result.error){
                    throw new Error(result.error)
                }
                
                setUsers(result)

            } catch (e) {
                alert(e.message)
            } finally {
                setLoading(false)
            }

        }

        fetchUsers()
    }, [])

    const handleSearch = async (e) => {
        
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
    },  setModal = (_id) => { /* Set modal state open or close and key list */
        setUserId(_id) /** Setting user id */
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
                        setModal(NaN)
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
                            <td><a href='#' onClick={() => setModal(user._id)}>{`${user.surnames} ${user.names}`}</a></td>
                            <td>{user.alias}</td>
                            <td><Link href={`/admin/payments?cid=${user.cid}`} target='_blank'>{user.cid}</Link></td>
                            <td>{user.active ? "activo" : "inactivo"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {visible && <Modal set={(val) => setVisible(val)} id={user_id} _users={users} setUsers={setUsers}/>}
    </>
}