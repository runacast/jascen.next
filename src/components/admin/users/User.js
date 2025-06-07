"use client"

import { useState } from 'react'
import { post, del } from '@/lib/users'

export default function Modal({open, data, children}){

    const [visible, setVisible] = useState(false)
    data = data ? data : {}

    return <>
    <span onClick={() => setVisible(true)}>{children}</span>
    {visible && (
        <div className='modal-background'>
            <div className='container'>
                <div className='content'>
                    <legend>{data._id ? 'Editar datos de usuario' : 'Ingresa los datos del usuario' }</legend>
                    {data._id && <input type='hidden' name='id' value={data._id} />}
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Código</label><input className='sec-2' type='number' name='codigo' defaultValue={data.cod && data.cod} />
                        </div>
                    </fieldset>
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Apellidos</label><input className='sec-7' required type='text' name='apellidos' defaultValue={data.surnames && data.surnames} />
                        </div>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Nombres</label><input className='sec-7' required type='text' name='nombres' defaultValue={data.names && data.names} />
                        </div>
                    </fieldset>
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Apodo</label><input className='sec-7' required type='text' name='apodo' defaultValue={data.alias && data.alias} />
                        </div>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Cédula</label><input className='sec-7' required type='number' name='cedula_id' defaultValue={data.cid && data.cid} />
                        </div>
                    </fieldset>
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Teléfono</label><input className='sec-6' type='number' name='telefono' defaultValue={data.phone && data.phone} />
                        </div>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Correo electrónico</label><input className='sec-7' type='text' name='correo' defaultValue={data.email && data.email} />
                        </div>
                    </fieldset>
                    <div className='field-group'>
                        <button type='submit' className='btn-form input-attach' formAction={post}>{data._id ? 'Actualizar' : 'Registrar'}</button>
                        <button type='button' className='btn-form input-attach' onClick={() => setVisible(false)}>Cancelar</button>
                        {data._id && <button type='submit' className='btn-group btn-form right' formAction={del}>Borrar usuario</button>}
                    </div>
                </div>
            </div>
        </div>
    )}
    </>
}