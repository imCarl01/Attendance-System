import React from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import landingPageImage from "../assets/image/1_DPNoWJ3Au35Fw58Sn2oj1w-removebg-preview.png"
const LandingPage = () => {
    const particlesInit = async (main) => {
        await loadFull(main);
    };
  return (
    
    <div className="relative flex justify-between items-center h-screen bg-[#00294f] p-10">
         <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute top-0 left-0 w-full h-full z-0"
        options={{
          fullScreen: false,
          background: {
            color: "#00294f",
          },
          particles: {
            number: {
              value: 80,
            },
            color: {
              value: "#ffffff"
            },
            shape: {
              type: "circle"
            },
            opacity: {
              value: 0.4
            },
            size: {
              value: 2
            },
            move: {
              enable: true,
              speed: 0.5
            }
          }
        }}
      />

        <div className='relative flex flex-col justify-center items-start'>
            <h1 className='text-3xl md:text-5xl font-bold text-white uppercase mb-5'>Smarter Attendance with a Single Look</h1>
            <p className='text-white mb-5'>AI-powered facial recognition attendance system that saves time, prevents impersonation, and streamlines classroom management — built for modern schools and universities.</p>
            <button className='bg-white text-[#00294f] font-bold px-4 py-2 rounded'>Get Started</button>
        </div>
        <div>
            <img src={landingPageImage} alt="Attendance System" className='hidden md:block lg:block md:w-350' />                                             
        </div>

    </div>
  )
}

export default LandingPage