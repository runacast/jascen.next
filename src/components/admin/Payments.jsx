'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/admin/payments/Header'

export default function Template(){

    const [registers, setRegisters] = useState([]),
    [visible, setVisible] = useState(false)

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

    const handleSubmit = async (event) => {
        event.preventDefault()
        const date = new Date(),
        form = new FormData(event.target),
        data = {
            ide: `${date.getMonth()}${date.getYear()}${form.get('cod')}`,
            cid: form.get('cid'),
            cod: form.get('cod'),
            paid: []
        }

        try{
            const response = await fetch('/api/payments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if(!response.ok){
                throw new Error('Error en el servidor')
            }
            
            const result = await response.json()
            setVisible(false)
            registers.push(result.data) // push data got
            setRegisters(registers)

        }catch(err){
            console.error(err)
            alert('Ocurrió un error')
        }
        
    }

    return <>
    <Header submit={ (event) => handleSubmit(event) } setModal={ (state) => setVisible(state) } open={visible} />
    <div className='tb-panel'>
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
    </>
}