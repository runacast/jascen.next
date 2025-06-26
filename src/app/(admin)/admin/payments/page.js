import Form from 'next/form'
import PaymentsClient from '@/components/admin/payments/PaymentsClient'
import PaymentHeader from '@/components/admin/payments/paymentHeader'

export default async function Calendar(){

    const date = new Date()

    const monthTime = new Intl.DateTimeFormat('es-EC', {
        timeZone: 'America/Lima',
        month: 'long'
    }).format(date)

    return <div className='ses-panel'>
        <h3>Fecha actual {date.toDateString()}</h3>
        <PaymentHeader/>
        <Form className='form'>
            <PaymentsClient></PaymentsClient>
        </Form>
    </div>
}