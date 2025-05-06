import React, { useEffect, useState } from 'react'
import { profile } from '../../connectBackend'

const Profile = () => {
  const [existingUser, setExistingUser] = useState(null)
  const[loading, setLoading] = useState(true)
  const [role,setRole] = useState()

  const getprofile = async () => {
    try {
      const response = await profile()
      console.log("Feteched Prodile:",response)
      if(response){
        setExistingUser(response.existingUser)
        localStorage.setItem("existingUser",JSON.stringify(response.existingUser))
      }
    } catch (error) {
        console.error("Error fetching profile:",error)
        return null
    } finally {
        setLoading(false)
    }
    
  }
  useEffect(() => {
    getprofile()
  },[])
  
  useEffect(()=>{
    if(existingUser?.role==="user"){
      setRole("Student")
    }else(
      setRole(existingUser?.role)
    )
  },[existingUser])
  return (
    <div>
      <p> </p>
      <p> {existingUser?.name}</p>
      <p> {existingUser?.email}</p>
      <p> {role}</p>
      {/* <pre>{JSON.stringify(existingUser?.faceDescriptor?.slice(0, 10), null, 2)}...</pre> */}
    </div>
  )
}

export default Profile