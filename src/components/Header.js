import header from '@/local/menus/header.json'

export default function Header(){

    const navbar = header['navbar']

    return <div id="header" className='container'>
        <div className='navbar content'>
            <nav className='nav-brand'><a className='logo' href='/'>JASCEN</a></nav>
            <nav className='nav-side'>
                <ul className='menu'>
                    {navbar.body.map((item, index) => {
                        return <li key={index}><a href={item.slug}>{item.title}</a></li>
                    })}
                </ul>
            </nav>
        </div>
    </div>
}