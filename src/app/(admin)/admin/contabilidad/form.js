'use client'

import { useState } from 'react'

export default function Form() {
  const [status, setStatus] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/.netlify/functions/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Error en el servidor')

      const result = await response.json()
      setStatus(`✅ Usuario registrado: ${JSON.stringify(result)}`)

    } catch (err) {
      console.error(err)
      setStatus('❌ Ocurrió un error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <fieldset>
        <label>Código:</label>
        <input name="cod" type="number" required />
      </fieldset>

      <fieldset>
        <label>Apellidos:</label>
        <input name="surnames" type="text" required />
      </fieldset>

      <fieldset>
        <label>Nombres:</label>
        <input name="names" type="text" required />
      </fieldset>

      <fieldset>
        <label>Apodo</label>
        <input name="alias" type="text" required />
      </fieldset>

      <fieldset>
        <label>Cédula</label>
        <input name="cid" type="number" required />
      </fieldset>

      <button type="submit">Registrar</button>
      {status && <p>{status}</p>}
    </form>
  )
}
