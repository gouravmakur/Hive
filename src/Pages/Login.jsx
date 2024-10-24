import React from 'react'
import {Login as LoginComponent} from '../Components/index'
import bgimage from '../assets/Bg-Loign-Signup.png'


function Login() {
  return (
    <div className="flex h-screen">
      {/* Login Form Section */}
      <div className="w-2/3 flex items-center justify-center">
        <LoginComponent />
      </div>
      {/* Photo Section */}
      <div
        className="w-1/3 bg-cover bg-center bg-green-300 "
      >
        <img src={bgimage} // Use correct path based on your folder structure
          alt="Background for Login"
          className="object-cover w-full h-full"
       />
        {/* You can add some text or a logo here if needed */}
      </div>
    </div>
  )
}

export default Login
