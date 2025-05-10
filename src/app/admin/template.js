import Footer from '@/components/Footer'

export default function AdminTemplate({children}){
    return (
        <html>
            <body>
                {children}
                <Footer />
            </body>
        </html>
    )
}