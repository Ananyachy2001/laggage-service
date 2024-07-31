import React from 'react'
import NavbarComp from '../Home/NavbarComp'
import HowItWorks from '../Home/HowitWorks'
import Footer from '../Home/Footer'

function GuidelineCom() {
  return (
    <div>
        <NavbarComp/>
        <div className='mt-20'>
            <HowItWorks  />
        </div>
        <Footer/>
        
    </div>
  )
}

export default GuidelineCom