import Users from '@/components/admin/Users'
import User from '../../../../models/User.js'

export default async function adminUsers() {
    
    const user = await User.findOne({ cod: 1 })
    const list = {meta_title:"Woob"}
    
    return <div className='ses-panel'>
        <Users headerData={list} />
    </div>
}