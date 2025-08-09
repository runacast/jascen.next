'use client'

import { useEffect, useState } from 'react'

export default function Panel(){

    const [registers, setRegisters] = useState([])

    useEffect(() => {

        const fetchOrders = async () => {
            const response = await fetch('/api/payments?page=1&limit=10',{method:'GET'})
            const result = await response.json()
            setRegisters(result)
        }

        fetchOrders()

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