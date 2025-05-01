import React from 'react'
import SideNavBar from '../components/SideNavBar'
import DashboardNav from '../components/DashboardNav'
import { Outlet } from 'react-router-dom'

const StudentDashboard = () => {
  return (
    <div className='flex'>
        <SideNavBar/>
        <div className='flex flex-col w-full '>
        <DashboardNav/>
        <div className='p-5'>
            <Outlet/>
        </div>
        </div>

    
    </div>
  )
}

export default StudentDashboard