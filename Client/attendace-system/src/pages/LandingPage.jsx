import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import landingPageImage from "../assets/image/1_DPNoWJ3Au35Fw58Sn2oj1w-removebg-preview.png";
import { motion } from "motion/react";
import NavBar from "../components/NavBar";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigation = useNavigate()

  const handleGetStarted = (e) => { 
    e.preventDefault()
    navigation('/studentdashboard')
  }
  return (
    <div >
      <NavBar/>
    <div className="flex justify-between items-center h-screen bg-[#00294f] p-10">
      <div className=" flex flex-col justify-center items-start">
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay:0.5,duration: 1 }}
          className="text-3xl md:text-5xl font-bold text-white uppercase mb-5"
        >
          Smarter Attendance with a Single Look
        </motion.h1>

        <motion.p 
        initial={{ x: -100, opacity: 0 }}
        animate={{x: 0, opacity: 1 }}
        transition={{ delay:0.5, duration: 1 }}
        className="text-white mb-5">
          AI-powered facial recognition attendance system that saves time,
          prevents impersonation, and streamlines classroom management — built
          for modern schools and universities.
        </motion.p>

        <div className="flex gap-4">
        <motion.button onClick={handleGetStarted}
        whileHover={{scale:1.0}}
        whileTap={{scale:0.5}}
        className="bg-white text-[#00294f] font-bold px-4 py-2 rounded">
          Get Started
        </motion.button>
        
        <motion.button 
        whileHover={{scale:1.0}}
        whileTap={{scale:0.5}}
        className="outline-2 outline-offset-1 outline-solid text-[#feffff] font-bold px-4 py-2 rounded">
          Learn More
        </motion.button>
        </div>
  
      </div>
      <div>
        <img
          src={landingPageImage}
          alt="Attendance System"
          className="hidden md:block lg:block md:w-350 animate-pulse"
        />
      </div>
    </div>
    <Features/>
    <HowItWorks/>
    <Footer/>
    </div>

  );
};

export default LandingPage;
