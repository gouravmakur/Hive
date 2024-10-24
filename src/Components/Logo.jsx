import React from 'react'
import logo from '../assets/HiveLogo-01.svg'

function Logo({width = '100px'}) {
  return (
    <div>
        <img src={logo} alt="Logo"  className='object-contain' style={{ width }}/>
        
    </div>
  )
}

export default Logo
