'use client'

import { useState } from 'react'

const start_year = 2015
const start_month = 0
const valueA = 1.00
const valueB = 2.00
const taxes = 0.00

export default function PaymentModal({children}){
    
    const [visible, setVisible] = useState(false),
    [userInfo, setUserInfo] = useState({}),
    [charges, setCharges] = useState([]),
    [bill, setBill] = useState({remaining:0,taxes:0.00,total:0.00,balance:0.00}),
    months = getMonths(start_year, start_month),

    registerPay = async (event) => {
        event.preventDefault()

        const form = new FormData(event.target),
        field = form.get('field'),
        value = form.get('value'),
        response = await fetch(`/api/users?key=${field}&value=${value}`,{method:'GET'}),
        user = await response.json(),
        list = getMonths()

        setUserInfo(user[0])

        if(user){

            const response1 = await fetch(`/api/payments?key=cid&value=${value}`,{method:'GET'}),
            payment = await response1.json()

            bill.remaining = list.length
            bill.total = list.reduce((acumulador, item) => acumulador + item.value, 0)
            bill.balance = bill.total
            setBill(bill)
            
            setCharges(list)

        }
        setVisible(true)

    },

    reCalculateBill = (event) => {
        setBill({
            remaining:  bill.remaining,
            taxes:  0.00,
            total:  bill.total,
            balance:  parseFloat(bill.total - event.target.value)
        })
        event.target.value = (event.target.value > bill.total || event.target.value == '') ? (0.00).toFixed(2) : event.target.value
    },

    handleSubmit = async (event) => {
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
            console.log(result)
            //window.location.reload()

        }catch(err){
            console.error(err)
            alert('Ocurrió un error')
        }
        
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
                        <form className='form' onSubmit={handleSubmit}>
                            <input type='hidden' name='cod' value={userInfo.cod} />
                            <input type='hidden' name='cid' value={userInfo.cid} />
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
                                            <th style={{width:10}}>Cont.</th>
                                            <th>Fecha</th>
                                            <th style={{width:500}}>Detalle</th>
                                            <th style={{width:50}}>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>{charges.map((info, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{String(info.month).padStart(2, '0')}/{info.year}</td>
                                            <td>{info.detail}</td>
                                            <td>${info.value.toFixed(2)}</td>
                                        </tr>
                                        ))}</tbody>
                                </table>
                            </div>
                            <fieldset>
                                <div className='row'>
                                    <div className='col-4'>Meses faltantes</div>
                                    <div className='col-8'>{bill.remaining}</div>
                                </div>
                                <div className='row'>
                                    <div className='col-4'>Total adeudado</div>
                                    <div className='col-8'>${bill.total.toFixed(2)}</div>
                                </div>
                                <div className='row'>
                                    <div className='col-4'>Faltante a cancelar</div>
                                    <div className='col-8'>${bill.balance.toFixed(2)}</div>
                                </div>
                                <div className='row'>
                                    <div className='col-4'>Valor a pagar</div>
                                    <div className='col-8'><input type='number' onChange={reCalculateBill} defaultValue={(0.00).toFixed(2)}/></div>
                                </div>
                            </fieldset>
                            <fieldset className='field-group'>
                                <button type='submit' className='btn btn-form'>Registrar pago</button>
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

    const start = new Date(year, index), // enero 2015
    today = new Date(),
    monthsCharge = [],
    months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    let current = new Date(start), count = 1

    while (
        current.getFullYear() < today.getFullYear() ||
        (current.getFullYear() === today.getFullYear() && current.getMonth() <= today.getMonth())
    ) {
        const year = current.getFullYear()
        const month = current.getMonth(), // 0-11
        item = {
            id: `${year}${String(month + 1).padStart(2, '0')}`,
            detail: `${months[month]} ${year}`,
            month: month + 1,
            year: year
        }
        if(count >= 1 && count <= 36){
            item.value = valueA
        }else{
            item.value = valueB
        }
        monthsCharge.push(item)
        count = count + 1
        current.setMonth(current.getMonth() + 1)
    }

    return monthsCharge

}