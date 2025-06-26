'use client'

import { useEffect, useState } from 'react'

export default function PaymentsClient(){

    const [orders, setOrders] = useState([])
    
    return <table className='table'>
        <tbody>
            {orders.map((order, index) => (
                <tr>
                    <td>{order.title}</td>
                </tr>
            ))}
        </tbody>
    </table>
}