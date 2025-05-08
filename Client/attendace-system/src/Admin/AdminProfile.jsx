import React, { useEffect, useState } from 'react'
import { adminProfile } from '../../connectBackend'
import ProfileCard from '../components/ProfileCard'

const AdminProfile = () => {
  const [existingAdmin, setExistingAdmin] = useState(null)
  const[loading, setLoading] = useState(true)
  const [role,setRole] = useState()

  const getAdminProfile = async () => {
    try {
      const response = await adminProfile()
      console.log("Feteched Prodile:",response)
      if(response){
        setExistingAdmin(response.existingAdmin)
        localStorage.setItem("existingAdmin",JSON.stringify(response.existingAdmin))
      }
    } catch (error) {
        console.error("Error fetching AdminProfile:",error)
        return null
    } finally {
        setLoading(false)
    }
    
  }
  useEffect(() => {
    getAdminProfile()
  },[])
  
  useEffect(()=>{
    if(existingAdmin?.role==="admin"){
      setRole("Admin")
    }else(
      setRole(existingAdmin?.role)
    )
  },[existingAdmin])
  return (
    <div>
      <ProfileCard 
      user={existingAdmin?.name}
      email={existingAdmin?.email}
      role={role}
      />
      
    </div>
  )
}

export default AdminProfile