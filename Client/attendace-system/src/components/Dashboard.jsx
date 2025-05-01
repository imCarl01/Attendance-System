import { Cpu } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import AttendanceTable from './AttendaceTable'

const Dashboard = () => {
  return (
    <div>
        <section className='flex justify-between items-center gap-4 p-4'>
            {/* attendance stats */}
            <div>
            <h1 className='font-semibold text-2xl'>Attendance Stats: 8/10</h1>

            </div>

            {/* attendance history */}
            <Link  className="bg-[#00294f] text-[#fff] font-bold px-4 py-2 rounded">View History</Link>
        </section>
        <section className='bg-[#00294f] text-[#fff] px-4 py-2 rounded p-4'>
            <div className='p-5'>
                <h1 className='text-4xl font-bold flex items-center gap-3'><Cpu /> Hi, John Doe</h1>
                <p>Welcome to Smart Attendace System. | Attendance with easy</p>
            </div>
        </section>
        <section>
            <AttendanceTable/>
        </section>
    </div>
  )
}

export default Dashboard