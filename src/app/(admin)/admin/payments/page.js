import Form from 'next/form'
import Header from '@/components/admin/payments/Header'
import Panel from '@/components/admin/payments/Panel'

export default async function Calendar(){

    const date = new Date()

    const monthTime = new Intl.DateTimeFormat('es-EC', {
        timeZone: 'America/Lima',
        month: 'long'
    }).format(date)

    return <div className='ses-panel'>
        <h3>Fecha actual {date.toDateString()}</h3>
        <Header/>
        <Panel/>
    </div>
}