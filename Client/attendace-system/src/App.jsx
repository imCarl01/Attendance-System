import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import NoPage from './pages/NoPage';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import LecturerDashboard from './pages/LecturerDashboard';
import Dashboard from './components/Dashboard';
import ScanFace from './Screens/ScanFace';
import Classes from './Screens/Classes';
import Status from './Screens/Status';
import History from './Screens/History';
import Settings from './Screens/Settings';
import Notification from './Screens/Notification';
import Profile from './Screens/Profile';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/studentdashboard" element={<StudentDashboard />} >
        <Route index element={<Dashboard/>} />
        <Route path="scan" element={<ScanFace/>} />
        <Route path="classes" element={<Classes/>} />
        <Route path="status" element={<Status/>} />
        <Route path="history" element={<History/>} />
        <Route path="settings" element={<Settings/>} />
        <Route path="notification" element={<Notification/>} />
        <Route path="profile" element={<Profile/>} />
      </Route>
      <Route path="/lecturerdashboard" element={<LecturerDashboard/>} />


      <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App