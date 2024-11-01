import React from 'react'
import { Signup as SignupComponent } from '../Components/index'
import bgimage from '../assets/Bg-Loign-Signup.png'

function Signup() {
  return (
    <div className="flex h-screen">
    {/* Login Form Section */}
    <div className="w-2/3 flex items-center justify-center">
      <SignupComponent />
    </div>
    {/* Photo Section */}
    <div
      className="w-1/3 bg-cover bg-center bg-green-300 "
    >
      <img src={bgimage} 
        alt="Background for Login"
        className="object-cover w-full h-full"
     />

    </div>
  </div>
  )
}

export default Signup
