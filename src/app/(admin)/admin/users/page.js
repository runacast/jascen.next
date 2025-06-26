import Form from 'next/form'
import UserHeader from '@/components/admin/users/UserHeader'
import UsersClient from '@/components/admin/users/UsersClient'

export default async function adminUsers() {
    
    return <div className='ses-panel'>
        <UserHeader modal={false}></UserHeader>
        <div className='v-overflow'>
            <UsersClient></UsersClient>
        </div>
    </div>
}