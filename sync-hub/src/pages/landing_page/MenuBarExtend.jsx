import { ExpandMore } from '@mui/icons-material'
import React from 'react'
import AboutUs from './AboutUs';
import Mission from './Mission';

function MenuBarExtend({setMenuBarExtend, menuBarExtendOption}) {
  return (
    <div className='relative pt-12 px-5 bg-red-40'>
      <div onClick={(e)=>{e.stopPropagation(); setMenuBarExtend(false)}} className='flex items-center gap-3 bg-red-30'>
        <div className='rotate-90'>
            <ExpandMore />
        </div>
        <p className="varela">Back</p>
      </div>

      <div>
        {menuBarExtendOption === "aboutUs" && <AboutUs />}
        {menuBarExtendOption === "mission" && <Mission />}
      </div>
    </div>
  )
}

export default MenuBarExtend
