import './base.css'

export const metadata = {
    "title": "JASCEN"
}

export default function Layout({children}){
    return <html>
        <body>
            {children}
        </body>
    </html>
}