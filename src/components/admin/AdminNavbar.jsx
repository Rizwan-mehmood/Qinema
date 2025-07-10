import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AdminNavbar = () => {
    return (
        <div className='flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30'>
            <Link to='/' className='flex w-auto'>
                <img src={assets.favicon} alt="" className='w-7.5 h-auto' />
                <span className='text-white text-[1.75rem] font-semibold'>inema</span>
            </Link>
        </div>
    )
}

export default AdminNavbar