import '@/app/base.css'
import './custom.css'
import Header from '@/components/Header'

export default function MainLayout({ children }) {
  return (
    <html lang={process.env.LANG}>
      <body>
        <Header />
        <div id="main">{children}</div>
      </body>
    </html>
  )
}