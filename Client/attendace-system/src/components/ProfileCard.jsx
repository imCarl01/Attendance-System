import React from 'react'
import profile from  "../assets/image/face-recognition.jpg"
import { UserPen } from 'lucide-react'
const ProfileCard = ({user,email,role}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:justify-between p-6 bg-white rounded-2xl shadow-md w-full max-w-4xl mx-auto">
      
    {/* Profile Section */}
    <section className="flex flex-col gap-4 w-full md:w-2/3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={profile} alt="Profile" className="w-20 h-20 rounded-full object-cover border border-gray-300" />
          <div>
            <p className="text-lg font-semibold text-gray-800">{user}</p>
            <p className="text-sm text-gray-500">{email}</p>
            <p className="text-sm text-blue-500 font-medium">{role}</p>
          </div>
        </div>
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition"
          title="Edit Profile"
        >
          <UserPen size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="flex justify-between border-b py-2">
          <span className="text-gray-600">Name:</span>
          <span className="font-medium text-gray-800">{user}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="text-gray-600">Email:</span>
          <span className="font-medium text-gray-800">{email}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="text-gray-600">Role:</span>
          <span className="font-medium text-gray-800">{role}</span>
        </div>
      </div>
    </section>

    {/* Settings Section */}
    <section className="w-full md:w-1/3 bg-gray-50 p-4 rounded-xl shadow-inner">
  <h3 className="text-lg font-semibold text-gray-700 mb-4">Settings</h3>

  {/* Language Selector */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="language">
      Language
    </label>
    <select
      id="language"
      className="w-full p-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option>English</option>
      <option>French</option>
      <option>Spanish</option>
    </select>
  </div>

  {/* Theme Mode */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="theme">
      Theme
    </label>
    <select
      id="theme"
      className="w-full p-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option>Light</option>
      <option>Dark</option>
      <option>System</option>
    </select>
  </div>

  {/* Notifications Toggle */}
  <div className="flex justify-between items-center mb-4">
    <span className="text-sm text-gray-600">Enable Notifications</span>
    <input
      type="checkbox"
      className="w-5 h-5 text-blue-600 rounded-md focus:ring-blue-400"
      defaultChecked
    />
  </div>

  {/* Change Password Link */}
  <div className="text-sm text-blue-600 hover:underline cursor-pointer">
    Change Password
  </div>
</section>
  </div>
  )
}

export default ProfileCard