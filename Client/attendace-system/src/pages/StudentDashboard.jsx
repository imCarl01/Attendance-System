import React, { useState } from 'react'
import SideNavBar from '../components/SideNavBar'
import DashboardNav from '../components/DashboardNav'
import { Outlet } from 'react-router-dom'

const StudentDashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className='flex'>
        <SideNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        <div className='flex flex-col w-full '>
        <DashboardNav toggleMenu={()=>{
          setIsMenuOpen(true)
        }}/>
        <div className='p-5'>
            <Outlet/>
        </div>
        </div>

    
    </div>
  )
}

export default StudentDashboard