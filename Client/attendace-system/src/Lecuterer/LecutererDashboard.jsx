import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import LecutererSideBarNav from './LecutererSideBarNav';
import LecutererDashBoardNav from './LecutererDashBoardNav';



const LecutererDashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className='flex'>
        <LecutererSideBarNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        <div className='flex flex-col w-full '>
        <LecutererDashBoardNav toggleMenu={()=>{
          setIsMenuOpen(true)
        }}/>
        <div className='p-5'>
            <Outlet/>
        </div>
        </div>

    
    </div>
  )
}

export default LecutererDashboard