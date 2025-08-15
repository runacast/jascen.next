'use client'

export default function Modal({ data, setModal, submit, _delete }){
    return <div className='modal-background'>
        <div className='container'>
            <div className='content'>
                <form className='form' onSubmit={submit}>
                    <legend>{data._id ? 'Editar datos de usuario' : 'Ingresa los datos del usuario'}</legend>
                    {data._id && (<fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Código</label><input className='sec-2' type='number' name='codigo' defaultValue={data.cod || ''} />
                        </div>
                    </fieldset>)}
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Apellidos</label><input className='sec-7' required type='text' name='apellidos' defaultValue={data.surnames || ''} />
                        </div>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Nombres</label><input className='sec-7' required type='text' name='nombres' defaultValue={data.names || ''} />
                        </div>
                    </fieldset>
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Apodo</label><input className='sec-7' required type='text' name='apodo' defaultValue={data.alias || ''} />
                        </div>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Cédula</label><input className='sec-7' required type='number' name='cedula' defaultValue={data.cid || ''} />
                        </div>
                    </fieldset>
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Teléfono</label><input className='sec-6' type='text' name='telefono' defaultValue={data.phone || ''} />
                        </div>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Correo electrónico</label><input className='sec-7' type='text' name='correo' defaultValue={data.email || ''} />
                        </div>
                    </fieldset>
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