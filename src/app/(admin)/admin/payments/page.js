import Form from 'next/form'
//import Register from '@/components/admin/payments/Register'

export default async function Calendar(){

    const date = new Date()

    const monthTime = new Intl.DateTimeFormat('es-EC', {
        timeZone: 'America/Lima',
        month: 'long'
    }).format(date)

    /*const payments = await get(),
    allTotal = 0, // Total de todo recaudado este mes
    activity = payments[date.getMonth()]*/

    return <>
    <br></br>
    <h3>Fecha actual {date.toDateString()}</h3>
    <Form className='form'>
        <legend>Registar pagos</legend>
        <fieldset className='field-group'>
            <label>Número de cédula o código</label>
            <input type='text' className='input-attach' name='query' />
        </fieldset>
    </Form>
    <Form className='form'>
        <table className='table'>
            
        </table>
    </Form>
    </>
}