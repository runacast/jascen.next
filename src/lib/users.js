// /src/lib/users.js

const API_URL = '/.netlify/functions/users'

export async function get(searchValue = '') {
  try {
    let url = API_URL
    if (searchValue) {
      url += `?search=${encodeURIComponent(searchValue)}`
    }
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export async function post(formData) {
  try {
    const data = {}
    
    // Convertir FormData a objeto
    for (let [key, value] of formData.entries()) {
      data[key] = value
    }
    
    // Si hay ID, es una actualización (PUT), sino es creación (POST)
    const method = data.id ? 'PUT' : 'POST'
    
    // Para PUT, necesitamos el _id
    if (method === 'PUT') {
      data._id = data.id
      delete data.id
    }
    
    const response = await fetch(API_URL, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error saving user:', error)
    throw error
  }
}

export async function del(formData) {
  try {
    const id = formData.get('id')
    
    const response = await fetch(API_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: id })
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}