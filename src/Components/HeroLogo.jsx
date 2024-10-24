import React from 'react'
import logo from '../assets/Hive-Logo-01.svg'

function HeroLogo({width = '200px'}) {
  return (
    <div>
      <img src={logo} alt="Logo" className="object-contain" style={{ width }} />
    </div>
  )
}

export default HeroLogo
