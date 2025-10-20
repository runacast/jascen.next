'use client'

import { useEffect, useState } from 'react'

export default function Modal({ id, set, _users, setUsers }){

    const [user, setUser] = useState({}),
    [loading, setLoading] = useState(true),
    [rows, setRows] = useState([]),
    [active, setActive] = useState('0')
    
    useEffect(() => { /** Load default data */

        (async () => {

            if (id) { /** Check if _id exists */
                const response = await fetch(`/api/users?id=${id}`, { method: 'GET' })

                if (!response.ok) {
                    alert('Error 404')
                }

                const data = await response.json()

                if (data) {
                    setUser(data)
                    setRows(data.properties)
                    setActive(data.active ? '1' : '0')
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }

        })()

    }, [])
    
    /** Add table row */
    const addRow = (event) => {
        setRows(rows.concat({title:`Casa ${rows.length + 1}`,address:'Centro'}))
    },
    setRow = (event, index, key) => {

        setRows(rows.map((data, _index) => {
            if(_index == index){
                data[key] = event.target.value;
            }
            return data
        }))

    },
    /** Remove table row */
    delRow = (index) => {

        setRows(rows.filter((data, _index) => _index !== index))

    },
    handleSubmit = async (event) => {

        event.preventDefault()
        
        const form = new FormData(event.target),
        methodType = id ? 'PUT' : 'POST' /** POST add and PUT modify */

        try{
            
            if(id)  form.set('id', id)
            
            const response = await fetch('/api/users', {
                method: methodType,
                body: form
            })

            if(!response.ok){
                throw new Error(response.error)
            }
            
            const result = await response.json() /** Fetch get response */

            if(id){ /** Modfied element on Array */

                setUsers(_users.map(_user => {
                    if(_user._id == id){
                        _user = result.data
                    }
                    return _user
                }))
                
            }else{ /** Add new element data to Array */
                setUsers(_users.concat(result.data))
                setRows(result.properties)
            }

            set(false)

        }catch(err){
            
            if(err.message){
                alert(err.message)
            }else{
                alert(err.toString())
            }
            
        }

    },
    handleDelete = async () => { /** Delete button */
        
        if(!confirm('¿Estás seguro de que quieres eliminar este usuario?')){
            return
        }
        
        try {

            const form = new FormData()

            if(id)  form.set('id', id)

            if(user.properties.length) form.set(`properties`, user.properties.length)

            const response = await fetch('/api/users', {
                method: 'DELETE',
                body: form
            })

            if(!response.ok){
                throw new Error('Server error request.')
            }

            setUsers(_users.filter(_user => _user._id !== id)) /** Reorder new Array without the element deleted */
            set(false)
            
        }catch(err){
            alert(err.message)
        }
    }

    return <div className='modal-background'>
        <div className='container'>
            <div className='content'>{loading ? <p>Loading...</p> : <form className='form' onSubmit={ handleSubmit }>
                    <legend>{id ? 'Editar datos de usuario' : 'Ingresa los datos del usuario'}</legend>
                    {id && (<fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Código</label><input className='sec-2' type='number' name='codigo' defaultValue={user.cod || ''} />
                        </div>
                        {id && (
                            <div className='col-6 form-area'>
                            <label>Actividad</label>
                            <div className=''>
                                <label>Activo <input type='radio' checked={active === '1'} onChange={() => setActive('1')} name='estado' value={'1'}/></label>
                                <label>Inactivo <input type='radio' checked={active === '0'} onChange={() => setActive('0')} name='estado' value={'0'}/></label>
                            </div>
                        </div>
                        )}
                    </fieldset>)}
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Persona*</label>
                            <input list={'person'} className='sec-7' required type='text' name='persona' defaultValue={user.user_type || 'Natural'} />
                            <datalist id='person'>
                                <option value={'Natural'}></option>
                                <option value={'Juridica'}></option>
                            </datalist>
                        </div>
                    </fieldset>
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Apellidos*</label>
                            <input className='sec-7' required type='text' name='apellidos' defaultValue={user.surnames || ''} />
                        </div>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Nombres*</label>
                            <input className='sec-7' required type='text' name='nombres' defaultValue={user.names || ''} />
                        </div>
                    </fieldset>
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Apodo / Institución</label>
                            <input className='sec-7' type='text' name='alias' defaultValue={user.alias || ''} />
                        </div>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Cédula / RUC*</label>
                            <input className='sec-7' required type='number' name='identificacion' defaultValue={user.cid || ''} />
                        </div>
                    </fieldset>
                    <fieldset className='field-group row'>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Teléfono</label>
                            <input className='sec-6' type='text' name='telefono' defaultValue={user.phone || ''} />
                        </div>
                        <div className='col-6 form-area'>
                            <label className='sec-3'>Correo electrónico</label>
                            <input className='sec-7' type='text' name='correo_electronico' defaultValue={user.email || ''} />
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
                                {rows.map((property, index) => (<tr key={index}>
                                    <td><input type='text' name={`propiedad[${index}][titulo]`} onChange={(e) => setRow(e, index, 'title')} value={property.title}/></td>
                                    <td><input type='text' name={`propiedad[${index}][direccion]`} onChange={(e) => setRow(e, index, 'address')} value={property.address}/></td>
                                    <td>
                                        {property._id && <input type='hidden' name={`propiedad[${index}][id]`} defaultValue={property._id} />}
                                        <button type='button' onClick={() => delRow(index)}>Quitar</button>
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                    <div className='field-group'>
                        <button type='submit' className='btn-form input-attach'>{id ? 'Actualizar' : 'Registrar'}</button>
                        <button type='button' className='btn-form input-attach' onClick={() => set(false)}>Cancelar</button>
                        {user._id && <button type='button' className='btn-group btn-form right' onClick={handleDelete}>Borrar usuario</button>}
                    </div>
                </form>}</div>
        </div>
    </div>
}