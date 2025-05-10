import Footer from '@/components/Footer'

export default function AdminLayout({children}){
    return (
        <html>
            <body>
                {children}
                <Footer />
            </body>
        </html>
    )
}