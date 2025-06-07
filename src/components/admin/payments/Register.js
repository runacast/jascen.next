'use client'

import { post,del } from '@/lib/payments'
import { useState,useTransition } from 'react'
import { get } from '@/lib/users'

const INI_YEAR = 2015
const MONTH_CHARGE = 2.00

const getMonthsFrom = (startYear) => {

    const namesMonths = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ]
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currenMonth = currentDate.getMonth() + 1
    const months = []
    
    for (let year = startYear; year <= currentYear; year++) {
        const limit = (year === currentYear) ? currenMonth : 12
        for (let month_num = 1; month_num <= limit; month_num++) {
            months.push({
                year,
                month_num,
                charge: MONTH_CHARGE.toFixed(2),
                month: namesMonths[month_num - 1],
                key: `${String(month_num).padStart(2, '0')}-${year}`
            })
        }
    }
    return months
}

export default function Register({open, data, children}){

    const [pending, startTransition] = useTransition(),
    [info, setInfo] = useState({error:false}),
    [visible, setVisible] = useState(false),
    [checkbox, setCheckbox] = useState(false),
    [bill, setBill] = useState({
        months:0,
        cal_months:0,
        total:0.00,
        cal_total:0.00
    })

    const searchUser = (form) => {

        const chargeList = getMonthsFrom(INI_YEAR),
        total_bill = (chargeList.length * MONTH_CHARGE)
        setBill({
            months: chargeList.length,
            cal_months: chargeList.length,
            total: total_bill, 
            cal_total: total_bill
        })

        startTransition(async () => {
            form.set('cod', form.get('query'))
            form.set('cid', form.get('query'))
            const user = await get(form,'cid')
            setVisible(true)
            if(user._id){
                setInfo({user,chargeList})
            }else{
                setInfo({error:true, message:'No se ha encontrado el usuario'})
            }
            
        })

    }

    const handleSubmit = (form) => {
        console.log(form)
    }

    const calculeTotal = (e) => {
        setBill({
            months: bill.months,
            cal_months: bill.months - (e.target.value / MONTH_CHARGE),
            total: bill.total,
            cal_total: (bill.total - e.target.value)
        })
    }

    return <>
    <button type='submit' className='btn-form input-attach' formAction={searchUser}>{children}</button>
    {visible && (
        <div className='modal-background'>
            <div className='container'>
                <div className='content'>
                    {info.error ? (
                        <>
                        <p><b>Error:</b> {info.message}</p>
                        <div className='field-group'>
                            <button type='button' className='btn-form input-attach' onClick={() => setVisible(false)}>Cerrar</button>
                        </div>
                        </>
                    ) : (
                        <>
                        <legend>Deudas pendientes del usuario</legend>
                        <div className='section-bill'>
                            <div className='col row-bill'>
                                <div className='sec-5 sec-bill'><b>Apellidos y Nombres</b> {info.user.surnames + ' ' + info.user.names}</div>
                                <div className='sec-5 sec-bill'><b>Número de cédula</b> {info.user.cid}</div>
                            </div>
                            <div className='col row-bill'>
                                <div className='sec-5 sec-bill'><b>Código de usuario</b> {info.user.cod}</div>
                                <div className='sec-5 sec-bill'><b>Fecha</b> 08/05/2025</div>
                            </div>
                            <table className='table table-bill'>
                                <thead>
                                    <tr>
                                        <th style={{width:'90%'}}>Detalles</th>
                                        <th style={{width:'10%',textAlign:'right'}}>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {info.chargeList.map((data, index) => (
                                        <tr key={index}>
                                            <td style={{width:'5%'}}>{index + 1}</td>
                                            <td style={{width:'80%'}}><span className='capilalize'>{data.month}</span> de {data.year}</td>
                                            <td style={{width:'10%'}}>{data.key}</td>
                                            <td style={{width:'5%'}}>{data.charge}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='col row-bill'>
                                <div className='sec-7 sec-bill'>Meses faltantes</div>
                                <div className='sec-3 sec-bill'><input type='number' className='right' required readOnly size={4} defaultValue={bill.cal_months}/></div>
                            </div>
                            <div className='col row-bill'>
                                <div className='sec-7 sec-bill'>Deuda</div>
                                <div className='sec-3 sec-bill'><input type='number' className='right' required readOnly size={4} defaultValue={bill.cal_total}/></div>
                            </div>
                            <div className='col row-bill'>
                                <div className='sec-7 sec-bill'>Abonar</div>
                                <div className='sec-3 sec-bill'><input type='number' className='right' required size={4} onChange={calculeTotal} defaultValue={0.00}/></div>
                            </div>
                        </div>
                        <div className='field-group'>
                            <button className='btn-group input-attach' formAction={handleSubmit}>Registrar pago</button>
                            <button type='button' className='btn-form input-attach' onClick={() => setVisible(false)}>Cancelar</button>
                        </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )}
    </>
}

