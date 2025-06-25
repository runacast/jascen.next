'use client'

import { useEffect, useState } from 'react'

export default function UsersClient() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchUsers = async () => {    
            try {
                const res = await fetch('/api/users')
                const data = await res.json()
                setUsers(data)
            } catch (err) {
                console.error('error getting users: ', err)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    if (loading) return <p>Cargando usuarios...</p>

    return <table className='table'>
        <thead>
            <tr>
                <th>N°</th>
                <th>Apellidos y nombres</th>
                <th>Apodo</th>
                <th>Cédula</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index) => (
                <tr key={index}>
                    <td>{user.cod}</td>
                    <td><User open={false} user={user}><a href='#'>{user.surnames} {user.names}</a></User></td>
                    <td>{user.alias}</td>
                    <td>{user.cid}</td>
                    <td>{user.status ? "activo" : "inactivo"}</td>
                </tr>
            ))}
        </tbody>
    </table>
}