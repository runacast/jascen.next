'use client'

import { useState, useRef, useEffect } from 'react'

export default function PaymentModal({ data, setState, children }){
    
    const itemRef = useRef([]), 
    [charges, setCharges] = useState([]),
    [bill, setBill] = useState({
        length: data.pendings.length,
        count: 0,
        taxes: 0.00,
        total: data.pendings.reduce((acumulator, item) => acumulator + item.value, 0),
        balance: 0.00,
        pay: 0.00
    })

    useEffect( () => {

        setBill({
            length: bill.length,
            count: bill.length,
            taxes: bill.taxes,
            total: bill.total,
            balance: bill.total,
            pay: bill.pay
        })
        
    }, [])

    const calculateBill = (index) => {

        let x = 0, acumulator = 0
        
        while (x < itemRef.current.length) {

            const item = itemRef.current[x]

            if (x <= index){

                acumulator = acumulator + data.pendings[x].value

                item.style.background = "#445"
                item.style.color = "#FFF"
            }else{
                item.style.background = "initial"
                item.style.color = "initial"
            }
            
            x++
        }

        const count = bill.length - (index + 1),
        balance = parseFloat(bill.total - acumulator),
        pay = acumulator
        
        setBill({ length: bill.length, taxes: bill.taxes, total: bill.total, pay, count, balance })
        
    }, handleSubmit = async (event) => {
        event.preventDefault()
        /*const date = new Date(),
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
        }*/
        
    }

    return <>
        <div className='modal-background'>
            <div className='container'>
                <div className='content'>
                    <form className='form' onSubmit={ handleSubmit }>
                        <input type='hidden' name='cod' value={data.cod} />
                        <input type='hidden' name='cid' value={data.cid} />
                        <fieldset>
                            <div className='row'>
                                <div className='col-4'>Apellidos y Nombres</div>
                                <div className='col-8'>{data.surnames} {data.names}</div>
                            </div>
                            <div className='row'>
                                <div className='col-4'>Cédula</div>
                                <div className='col-8'>{data.nid}</div>
                            </div>
                            <div className='row'>
                                <div className='col-4'>Código</div>
                                <div className='col-8'>{data.cod}</div>
                            </div>
                        </fieldset>
                        <div className="table-container">
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th style={{ width: 10 }}>Cont.</th>
                                        <th>Fecha</th>
                                        <th style={{ width: 500 }}>Detalle</th>
                                        <th style={{ width: 500 }}>Propiedades</th>
                                        <th style={{ width: 50 }}>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>{data.pendings.map((info, index) => (
                                    <tr key={index} ref={ (el) => (itemRef.current[index] = el) } onClick={ () => calculateBill(index) } style={{cursor:"pointer"}}>
                                        <td>{index + 1}</td>
                                        <td>{String(info.month).padStart(2, '0')}/{info.year}</td>
                                        <td>{info.detail}</td>
                                        <td>{data.properties.length}</td>
                                        <td>${info.value.toFixed(2)}</td>
                                    </tr>
                                ))}</tbody>
                            </table>
                        </div>
                        <fieldset>
                            <div className='row'>
                                <div className='col-4'>Meses restantes</div>
                                <div className='col-8'>{bill.count}</div>
                            </div>
                            <div className='row'>
                                <div className='col-4'>Faltante a cancelar</div>
                                <div className='col-8'>${bill.balance.toFixed(2)}</div>
                            </div>
                            <div className='row'>
                                <div className='col-4'>Valor a cancelar</div>
                                <div className='col-8'>${bill.pay.toFixed(2)}</div>
                            </div>
                        </fieldset>
                        <fieldset className='field-group'>
                            <button type='submit' className='btn btn-form'>Registrar pago</button>
                            <button type='button' onClick={(event) => { setState(false) }} className='btn btn-form'>Cancelar</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </>
}