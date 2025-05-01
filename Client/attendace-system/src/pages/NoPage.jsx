import React from 'react'
import pageNotFound from "../assets/error/wreck-it-ralph-ralph.gif"
const NoPage = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <img src={pageNotFound} alt="404 Error - Page not found" />
    </div>
  )
}

export default NoPage