'use client'

import { useEffect, useState } from 'react'

export default function Panel(){

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('/api/payments?page=1&limit=10',{method:'GET'})
            const result = await response.json()
        }
    })
    
    return <div className='tb-panel'>
        <table className='table'>
            <tbody>
                {orders.map((order, index) => (
                    <tr>
                        <td>{order.title}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}