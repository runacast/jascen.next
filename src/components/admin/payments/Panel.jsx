'use client'

import { useEffect, useState } from 'react'

export default function Panel(){

    const [registers, setRegisters] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {

        try {
            fetch('/api/payments?page=1&limit=10',{method:'GET'})
            .then((res) => {
                if(res.ok){
                    return res.json()
                }
            }).then((res) => {
                setRegisters(res)
            })
        } catch (err){
            alert('Error:'+err.message)
        }

    }, [])
    
    return <div className='tb-panel'>
        <table className='table'>
            <thead>
                <tr>
                    <th>Clave de registro</th>
                    <th>Fecha de pago</th>
                </tr>
            </thead>
            <tbody>
                {registers.map((order, index) => (
                    <tr key={index}>
                        <td>{order.ide}</td>
                        <td>{(new Date(order.date)).toDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}