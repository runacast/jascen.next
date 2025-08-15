'use client'

export default async function adminBills() {

  const submit = async (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const res = await fetch('/api/users',{
      method: 'POST',
      body: form
    })

    if(!res.ok){
      alert(res)
      return
    }

    console.log(await res.json())
  }

  return (
    <main>
      <h1>Nuevo usuario</h1>
      <form onSubmit={submit}>
      <input name="title"></input>
      <button type="submit">TEst</button>
      </form>
    </main>
  )
}