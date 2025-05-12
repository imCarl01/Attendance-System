import React, { useEffect, useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import { profileLecturer } from '../../connectBackend'

const LecutererProfile = () => {
  const [existingLecturer, setExistingLecturer] = useState(null)
  const[loading, setLoading] = useState(true)
  const [role,setRole] = useState()

  const getLecturerProfile = async () => {
    try {
      const response = await profileLecturer()
      console.log("Feteched Prodile:",response)
      if(response){
        setExistingLecturer(response.existingLecturer)
        localStorage.setItem("existingLecturer",JSON.stringify(response.existingLecturer))
      }
    } catch (error) {
        console.error("Error fetching AdminProfile:",error)
        return null
    } finally {
        setLoading(false)
    }
    
  }
  useEffect(() => {
    getLecturerProfile()
  },[])
  
  useEffect(()=>{
    if(existingLecturer?.role==="lecturer"){
      setRole("Lecturer")
    }else(
      setRole(existingLecturer?.role)
    )
  },[existingLecturer])
  return (
    <div>
      <ProfileCard 
      user={existingLecturer?.name}
      email={existingLecturer?.email}
      role={role}
      />
      
    </div>)
}

export default LecutererProfile