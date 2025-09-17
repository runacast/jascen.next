'use client'

import { useState, useEffect } from "react"

export default () => {

    const [properties, setProperties] = useState([])

    try{

        useEffect(() => {
            const listFetch = async () => {
                const response = await fetch('/api/properties', {
                    method: 'GET'
                })

                if (!response.ok) {
                    alert('error get list')
                }

                setProperties(await response.json())
            }

            listFetch()

        }, [])

        console.log(properties)

        return <>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titular</th>
                        <th>Propiedad</th>
                        <th>Dirección</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    }catch(e){
        return <div className="message">
        <p>{e.message}</p>
        </div>
    }

}