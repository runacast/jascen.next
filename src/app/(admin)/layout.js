import '@/app/base.css'
import './custom.css'
import Header from '@/components/admin/Header'
import Footer from '@/components/admin/Footer'

export default function AdminLayout({children}) {

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