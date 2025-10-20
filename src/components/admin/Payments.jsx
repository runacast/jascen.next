'use client'

import { useEffect, useState, useRef } from 'react'
import Modal from '@/components/admin/payments/Modal'
import {Months, start_year, start_month} from '@/lib/payments'
import { useSearchParams } from 'next/navigation'

export default () => {
    
    const searchParams = useSearchParams()
    const searchForm = useRef(null),
    [payments, setPayments] = useState([]),
    [visible, setVisible] = useState(false),
    [note, setNote] = useState({}),
    cid = searchParams.get('cid')

    useEffect(() => {

        try {
            
            if(cid){
                const xform = searchForm.current
                xform['value'].value = cid
                console.log(cid)
            }

        } catch (err){
            alert('Error:'+err.message)
        }

    }, [])

    const handleSearchSubmit = async (event) => {

        try {
            
            const form = new FormData(searchForm.current),
                response = await fetch(`/api/users?${form.get('field')}=${form.get('value')}`, { method: 'GET' })

            if(!response.ok){
                throw  new Error(response.error)
            }

            const user = await response.json()
            
            if(!user[0]){
                throw  new Error('User not found.')
            }

            const note = user[0]

            console.log(note.properties.length)

            note.pendings = Months()
            setNote(note)
            setVisible(true)

        } catch (e) {
            alert(e.message)
        }

    }

    return <>
        <form ref={searchForm} className='form'>
            <fieldset className='field-group'>
                <input className='input-attach' type='number' required placeholder='Ingresa el identificador' name='value' />
                <select className='input-attach' name='field'>
                    <option value='identificacion'>Cédula / RUC</option>
                    <option value='codigo'>Código</option>
                </select>
                <button type='button' className="btn btn-form input-attach" onClick={handleSearchSubmit}>Buscar usuario</button>
            </fieldset>
        </form>
        <div className='tb-panel'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Clave de registro</th>
                        <th>Fecha de pago</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((order, index) => (
                        <tr key={index}>
                            <td>{order.ide}</td>
                            <td>{(new Date(order.date)).toDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {visible && <Modal data={note} setState={(value) => setVisible(value)} />}
    </>
}