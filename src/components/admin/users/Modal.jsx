'use client'

import { useEffect, useState } from 'react'

export default function Modal({ data, setModal, submit, _delete }){

    const [rows, setRows] = useState([])
    
    useEffect(() => { /** Load default data */
        
        if(data._id) (async () => { /** Check if _id exists */ 

            const response = await fetch(`/api/properties?userId=${data._id}&options=title,address`,{method: 'GET'})
            
            if(!response.ok){
                alert('Error, 404')
            }

            const property = await response.json()

            setRows([property])

        })()

    },[])
    
    const [activo, setActivo] = useState(Number(data.active) ? '1' : '0'),
    /** Add table row */
    addRow = (event) => {
        setRows(rows.concat({title:`Casa ${rows.length + 1}`,address:"Centro"}))
    },
    /** Remove table row */
    delRow = (index) => {
        setRows(rows.filter((item, i) => i !== index))
    }

    return <div className='modal-background'>
        <div className='container'>
            <div className='content'>
                <form className='form' onSubmit={submit}>
                    <legend>{data._id ? 'Editar datos de usuario' : 'Ingresa los datos del usuario'}</legend>
                    {data._id && (<fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Código</label><input className='sec-2' type='number' name='codigo' defaultValue={data.cod || ''} />
                        </div>
                        {data._id && (
                            <div className='col-6 form-area'>
                            <label>Actividad</label>
                            <div className=''>
                                <label>Activo <input type='radio' checked={activo === '1'} onChange={() => setActivo('1')} name='estado' value={'1'}/></label>
                                <label>Inactivo <input type='radio' checked={activo === '0'} onChange={() => setActivo('0')} name='estado' value={'0'}/></label>
                            </div>
                        </div>
                        )}
                    </fieldset>)}
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Persona*</label>
                            <input list={'person'} className='sec-7' required type='text' name='persona' defaultValue={data.user_type || 'Natural'} />
                            <datalist id='person'>
                                <option value={'Natural'}></option>
                                <option value={'Juridica'}></option>
                            </datalist>
                        </div>
                    </fieldset>
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Apellidos*</label>
                            <input className='sec-7' required type='text' name='apellidos' defaultValue={data.surnames || ''} />
                        </div>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Nombres*</label>
                            <input className='sec-7' required type='text' name='nombres' defaultValue={data.names || ''} />
                        </div>
                    </fieldset>
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Apodo / Institución</label>
                            <input className='sec-7' type='text' name='alias' defaultValue={data.alias || ''} />
                        </div>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Cédula / RUC*</label>
                            <input className='sec-7' required type='number' name='identificacion' defaultValue={data.cid || ''} />
                        </div>
                    </fieldset>
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Teléfono</label>
                            <input className='sec-6' type='text' name='telefono' defaultValue={data.phone || ''} />
                        </div>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Correo electrónico</label>
                            <input className='sec-7' type='text' name='correo_electronico' defaultValue={data.email || ''} />
                        </div>
                    </fieldset>
                    <fieldset className='field-group row'>
                        <div className='col-12 form-area'>
                            <button type="button" className='btn btn-default' onClick={addRow}>Añadir propiedad</button>
                        </div>
                    </fieldset>
                    <div className="table-container">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Propiedad</th>
                                    <th>Dirección</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((item, index) => (<tr key={index}>
                                    <td><input type='text' defaultValue={item.title}/></td>
                                    <td><input type='text' defaultValue={item.address}/></td>
                                    <td><button type='button' onClick={() => delRow(index)}>Quitar</button></td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                    <div className='field-group'>
                        <button type='submit' className='btn-form input-attach'>{data._id ? 'Actualizar' : 'Registrar'}</button>
                        <button type='button' className='btn-form input-attach' onClick={() => setModal(false)}>Cancelar</button>
                        {data._id && <button type='button' className='btn-group btn-form right' onClick={_delete}>Borrar usuario</button>}
                    </div>
                </form>
            </div>
        </div>
    </div>
}