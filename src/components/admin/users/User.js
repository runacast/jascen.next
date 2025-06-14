'use client'

import { useState } from 'react'
import { post, del } from '@/lib/users'

export default function Modal({open, user = {}, children}){

    const [visible, setVisible] = useState(false)

    return <>
    <span onClick={() => setVisible(true)}>{children}</span>
    {visible && (
        <div className='modal-background'>
            <div className='container'>
                <div className='content'>
                    <legend>{user._id ? 'Editar datos de usuario' : 'Ingresa los datos del usuario' }</legend>
                    {user._id && <input type='hidden' name='id' value={user._id} />}
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Código</label><input className='sec-2' type='number' name='codigo' defaultValue={user.cod && user.cod} />
                        </div>
                    </fieldset>
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Apellidos</label><input className='sec-7' required type='text' name='apellidos' defaultValue={user.surnames && user.surnames} />
                        </div>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Nombres</label><input className='sec-7' required type='text' name='nombres' defaultValue={user.names && user.names} />
                        </div>
                    </fieldset>
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Apodo</label><input className='sec-7' required type='text' name='apodo' defaultValue={user.alias && user.alias} />
                        </div>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Cédula</label><input className='sec-7' required type='number' name='cedula_id' defaultValue={user.cid && user.cid} />
                        </div>
                    </fieldset>
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Teléfono</label><input className='sec-6' type='number' name='telefono' defaultValue={user.phone && user.phone} />
                        </div>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Correo electrónico</label><input className='sec-7' type='text' name='correo' defaultValue={user.email && user.email} />
                        </div>
                    </fieldset>
                    <div className='field-group'>
                        <button type='submit' className='btn-form input-attach' formAction={post}>{user._id ? 'Actualizar' : 'Registrar'}</button>
                        <button type='button' className='btn-form input-attach' onClick={() => setVisible(false)}>Cancelar</button>
                        {user._id && <button type='submit' className='btn-group btn-form right' formAction={del}>Borrar usuario</button>}
                    </div>
                </div>
            </div>
        </div>
    )}
    </>
}