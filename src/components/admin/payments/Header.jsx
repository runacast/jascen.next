'use client'

import { useState } from 'react'

const serviceValue = 2.00
const taxes = 0.00

export default function PaymentModal({children}){
    
    const [visible, setVisible] = useState(false),
    [userInfo, setUserInfo] = useState({}),
    [charges, setCharges] = useState([]),
    months = getMonths(),
    registerPay = async (event) => {
        event.preventDefault()

        const form = new FormData(event.target),
        field = form.get('field'),
        value = form.get('value'),
        response = await fetch(`https://jascen.netlify.app/api/users?key=${field}&value=${value}`,{method:'GET'}),
        user = await response.json()

        setUserInfo(user[0])

        if(user){

            const response1 = await fetch(`https://jascen.netlify.app/api/payments?key=cid&value=${value}`,{method:'GET'}),
            payment = await response1.json()
            let count = 1,
            list = []
            if(payment.charges){
                list = payment.charges.map((info, index) => {
                    if (info.id !== months.id) {
                        count = count + 1
                        info.count = count
                        return info
                    }
                })
            }
            
            setCharges(list)

        }
        setVisible(true)
    }

    return <>
        <form className='form' onSubmit={registerPay}>
            <fieldset className='field-group'>
                <input className='input-attach' type='number' required placeholder='Ingresa el identificador' name='value' />
                <select className='input-attach' name='field'>
                    <option value='cid'>Cédula</option>
                    <option value='cod'>Código</option>
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
                                    <div className='col-4'>Apellidos y Nombres</div>
                                    <div className='col-8'>{userInfo.surnames} {userInfo.names}</div>
                                </div>
                                <div className='row'>
                                    <div className='col-4'>Cédula</div>
                                    <div className='col-8'>{userInfo.cid}</div>
                                </div>
                                <div className='row'>
                                    <div className='col-4'>Código</div>
                                    <div className='col-8'>{userInfo.cod}</div>
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
            id: `${year}${String(month + 1).padStart(2, '0')}`,
            detail: `${months[month]} ${year}`,
            date: `${String(month + 1).padStart(2, '0')}/${year}`,
            taxes,
            value: serviceValue
        })

        current.setMonth(current.getMonth() + 1)
    }

    return monthsCharge

}