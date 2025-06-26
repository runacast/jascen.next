'use client'

import { useState } from 'react'

export default function PaymentModal({children}){
    
    const [visible, setVisible] = useState(false),
    [charges, setCharges] = useState([]),

    registerNote = (event) => {
        event.preventDefault()
        
        let opt = getMonths().map(info => ({
            ...info,
            value:2.00,
            tax:0.00
        }))

        setCharges(opt)
        setVisible(true)
    }

    return <>
        <form className='form' onSubmit={registerNote}>
            <fieldset className='field-group'>
                <input className='input-attach' type='number' required placeholder='Ingresa el identificador' />
                <select className='input-attach'>
                    <option value='cedula'>Cédula</option>
                    <option value='codigo'>Código</option>
                </select>
                <button type='submit' className="btn btn-form input-attach">Registrar pago</button>
            </fieldset>
        </form>
        {visible && (
            <div className='modal-background'>
                <div className='container'>
                    <div className='content'>
                        <form className='form'>
                            <fieldset>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <sub>Apellidos y nombres</sub>
                                                Usuario...
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </fieldset>
                            <fieldset>
                                <div className='v-overflow'>
                                    <table className='table table-bill'>
                                        <thead>
                                            <tr>
                                                <th>Contador</th>
                                                <th>Detalle</th>
                                                <th>Fecha</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {charges.map((info, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{info.detail}</td>
                                                    <td>{info.date}</td>
                                                    <td>{info.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </fieldset>
                            <fieldset className='field-group'>
                                <button type='button' onClick={(event) => {setVisible(false)}} className='btn btn-form'>Cancelar</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        )}
    </>
}

function getMonths(year = 2015, index = 0){

    const start = new Date(year, index) // enero 2015
    const today = new Date()
    const monthsCharge = []

    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    let current = new Date(start)

    while (
        current.getFullYear() < today.getFullYear() ||
        (current.getFullYear() === today.getFullYear() && current.getMonth() <= today.getMonth())
    ) {
        const year = current.getFullYear()
        const month = current.getMonth() // 0-11
        monthsCharge.push({
            detail: `${months[month]} ${year}`,
            date: `${String(month + 1).padStart(2, '0')}/${year}`
        })

        current.setMonth(current.getMonth() + 1)
    }

    return monthsCharge

}