import React, { useEffect, useState } from 'react'
import { adminProfile } from '../../connectBackend'

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
      <p> </p>
      <p> {existingAdmin?.name}</p>
      <p> {existingAdmin?.email}</p>
      <p> {role}</p>
      {/* <pre>{JSON.stringify(existingUser?.faceDescriptor?.slice(0, 10), null, 2)}...</pre> */}
    </div>
  )
}

export default AdminProfile