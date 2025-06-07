import '@/app/base.css'
import './custom.css'
import Header from '@/components/admin/Header'
import Footer from '@/components/admin/Footer'
import fs from 'fs'
import path from 'path'
import { encrypt } from '@/lib/crypto'

export default function AdminLayout({children}) {

  /* Calendar */
  let calendar = []
  const date = new Date()
  const fileCalendarPath = path.join(process.cwd(), 'src', 'local', 'calendar', date.getUTCFullYear() + '.json')
  
  if(!fs.existsSync(fileCalendarPath)){

    const size = date.getUTCMonth(), 
    months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ]
    
    let index = 0
    while(index <= size){
      calendar.push({
        id: index,
        name: months[index],
        users: []
      })
      index = index + 1
    }
    
    fs.writeFileSync(fileCalendarPath, JSON.stringify(encrypt(JSON.stringify(calendar))))

  }

  return <html>
    <body>
      <Header />
      <div className='container'>
        <div className='content'>
          {children}
        </div>
      </div>
      <Footer />
    </body>
  </html>
}