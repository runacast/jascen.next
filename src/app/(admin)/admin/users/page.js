import Users from '@/components/admin/Users'
import User from '@/models/User.js'

export default async function adminUsers() {
    
    const list = await User.find()
    
    return <div className='ses-panel'>
        <Users headerData={list} />
    </div>
}