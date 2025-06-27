'use client'

import { useState } from 'react'

const serviceValue = 2.00

export default function PaymentModal({children}){
    
    const [visible, setVisible] = useState(false),
    [charges, setCharges] = useState([]),

    registerPay = async (event) => {
        event.preventDefault()

         const res = await fetch('/api/users',{
            method: 'GET'
         })

        setCharges(getMonths().map(info => ({
            ...info,
            value:serviceValue,
            tax:0.00
        })))
        setVisible(true)
    }

    return <>
        <form className='form' onSubmit={registerPay}>
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
                                <div className='row'>
                                    <div className='col-4'>Nombres y Apellidos</div>
                                    <div className='col-8'>...</div>
                                </div>
                                <div className='row'>
                                    <div className='col-4'>Cédula</div>
                                    <div className='col-8'>....</div>
                                </div>
                                <div className='row'>
                                    <div className='col-4'>Código</div>
                                    <div className='col-8'>1</div>
                                </div>
                            </fieldset>
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th style={{width:10}}>Contado</th>
                                            <th>Fecha</th>
                                            <th style={{width:500}}>Detalle</th>
                                            <th style={{width:50}}>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>{charges.map((info, index) => (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{info.date}</td>
                                            <td>{info.detail}</td>
                                            <td>${info.value.toFixed(2)}</td>
                                        </tr>
                                        ))}</tbody>
                                </table>
                            </div>
                            <fieldset>
                                <div className='row'>
                                    <div className='col-4'>Meses faltantes</div>
                                    <div className='col-8'>5</div>
                                </div>
                                <div className='row'>
                                    <div className='col-4'>Total adeudado</div>
                                    <div className='col-8'>$200</div>
                                </div>
                                <div className='row'>
                                    <div className='col-4'>Valor a pagar</div>
                                    <div className='col-8'><input type='number' defaultValue={(0.00).toFixed(2)}/></div>
                                </div>
                            </fieldset>
                            <fieldset className='field-group'>
                                <button type='button' className='btn btn-form'>Registrar pago</button>
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