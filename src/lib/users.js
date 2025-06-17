'use server'

const baseUrl = process.env.URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8888'

export async function get(form){

    let payload = {}

    if(form){
        payload = Object.fromEntries(form.entries())
    }

    const url = new URL('/.netlify/functions/users', baseUrl)

    Object.entries(payload).forEach(([key, value]) =>
        url.searchParams.append(key, value)
    )

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Accept': 'application/json' // mejor para GET
        }
    })

    if (!response.ok) throw new Error('Error get users')
    return await response.json()

}

export async function post(form) {

    let payload = {}

    if (form){
        payload = Object.fromEntries(form.entries())
    }

    const response = await fetch(`/.netlify/functions/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (!response.ok) throw new Error('Error post user')
    return await response.json()

}

export async function del(form) {

    if (form){
        payload = Object.fromEntries(form.entries())
    }

    const response = await fetch(`${baseUrl}/.netlify/functions/users`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (!response.ok) throw new Error('Error delete user')

    return null
}