'use client'

import Form from 'next/form'
import { useState } from 'react'

export default function Modal({open, user = {}, children}){

    const [visible, setVisible] = useState(false)

    const handleSubmit = async (event) => {

        event.preventDefault()

        const form = new FormData(event.target),
        data = {
            cod: parseInt(form.get('codigo'), 10),
            surnames: form.get('apellidos'),
            names: form.get('nombres'),
            alias: form.get('apodo'),
            cid: parseInt(form.get('cedula'), 10),
            phone: form.get('telefono'),
            email: form.get('correo'),
            active: true
        }

        try {

            const response = await fetch('/.netlify/functions/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if(!response.ok) throw new Error('Error en el servidor')
                const result = await response.json()
            setVisible(false)

        }catch(err){
            alert(err.message)
        }

    }

    const handleDelete = async (event) => {
        
        if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            return
        }
        
        const form = new FormData()
        try {
            alert('Usuario eliminado')
            setVisible(false)
            // Recargar la página para mostrar los cambios
            window.location.reload()
        } catch (err) {
            console.error('Error al eliminar:', err)
            alert('Ocurrió un error al eliminar el usuario')
        }
    }

    return <>
        <span onClick={() => setVisible(true)}>{children}</span>
        {visible && (
            <div className='modal-background'>
                <div className='container'>
                    <div className='content'>
                        <Form className='form' onSubmit={handleSubmit}>
                            <legend>{user._id ? 'Editar datos de usuario' : 'Ingresa los datos del usuario'}</legend>
                            {user._id && <input type='hidden' name='id' value={user._id} />}
                            <fieldset className='field-group row'>
                                <div className='col-6 form-area'>
                                    <label className='sec-3'>Código</label><input className='sec-2' type='number' name='codigo' defaultValue={user.cod || ''} />
                                </div>
                            </fieldset>
                            <fieldset className='field-group row'>
                                <div className='col-6 form-area'>
                                    <label className='sec-3'>Apellidos</label><input className='sec-7' required type='text' name='apellidos' defaultValue={user.surnames || ''} />
                                </div>
                                <div className='col-6 form-area'>
                                    <label className='sec-3'>Nombres</label><input className='sec-7' required type='text' name='nombres' defaultValue={user.names || ''} />
                                </div>
                            </fieldset>
                            <fieldset className='field-group row'>
                                <div className='col-6 form-area'>
                                    <label className='sec-3'>Apodo</label><input className='sec-7' required type='text' name='apodo' defaultValue={user.alias || ''} />
                                </div>
                                <div className='col-6 form-area'>
                                    <label className='sec-3'>Cédula</label><input className='sec-7' required type='number' name='cedula' defaultValue={user.cid || ''} />
                                </div>
                            </fieldset>
                            <fieldset className='field-group row'>
                                <div className='col-6 form-area'>
                                    <label className='sec-3'>Teléfono</label><input className='sec-6' type='number' name='telefono' defaultValue={user.phone || ''} />
                                </div>
                                <div className='col-6 form-area'>
                                    <label className='sec-3'>Correo electrónico</label><input className='sec-7' type='text' name='correo' defaultValue={user.email || ''} />
                                </div>
                            </fieldset>
                            <div className='field-group'>
                                <button type='submit' className='btn-form input-attach'>{user._id ? 'Actualizar' : 'Registrar'}</button>
                                <button type='button' className='btn-form input-attach' onClick={() => setVisible(false)}>Cancelar</button>
                                {user._id && <button type='button' className='btn-group btn-form right' onClick={handleDelete}>Borrar usuario</button>}
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )}
    </>
}