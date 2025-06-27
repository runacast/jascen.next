'use client'

import { useEffect, useState } from 'react'

export default function Panel(){

    const [orders, setOrders] = useState([])
    
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