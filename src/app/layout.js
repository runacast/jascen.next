import './base.css'
import './custom.css'
import Header from '@/components/Header'

export const metadata = {
    "title": "JASCEN"
}

export default function RootLayout({children}){
    return (
        <html>
            <body>
                <Header />
                {children}
            </body>
        </html>
    )
}