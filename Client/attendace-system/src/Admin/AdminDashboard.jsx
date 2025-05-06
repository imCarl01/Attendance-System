import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideNavBar from './AdminSideNavBar'
import AdminDashboardNav from './AdminDashboardNav'

const AdminDashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className='flex'>
        <AdminSideNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        <div className='flex flex-col w-full '>
        <AdminDashboardNav toggleMenu={()=>{
          setIsMenuOpen(true)
        }}/>
        <div className='p-5'>
            <Outlet/>
        </div>
        </div>

    
    </div>
  )
}

export default AdminDashboard