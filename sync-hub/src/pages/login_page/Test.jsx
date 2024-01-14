import React from 'react'
import ola from "../../pages/images/ola.jpg"
import { Call, Email, LocationOnOutlined } from '@mui/icons-material'
import { Link } from '@mui/material'

function Test() {




  return (
    // <div className='space-y-1 p-10'>
    //  { [[1,2,3], [1,2,3] , [1,2,3]].map((item1, index1) => { return (
    //     <div className='flex gap-1 text-[10px]'>
    //         { item1.map((item2, index2) => {return (
    //             // {(index1+1 === 1|| index1+1 === 2 || index1 +1 ==3 ) && (item2 === 1 || item2 === 2 || item2 === #) }
    //             // <div className={`size-8 ${ (([1,2,3].includes(index1+1)) && ([1,2,3].includes(item2))) ? "bg-gray-900 bg-opacity-80 " : "bg-pink-400"} rounded-sm p-1 border border-slate-900 text-sm flex items-center justify-center`}>
    //                 <div className={`size-8 bg-white rounded-sm p-1 border border-slate-900 text-sm flex items-center justify-center`}>
    //                 Y <span className='text-xs mt-1'> {index1 + 1}{item2} </span>
    //             </div>
    //         )})}
    //     </div>    
    //  )}) }
    //  </div>
    <div className='w-[90%] mx-auto mt-10 border'>
      <div className='flex items-center justify-between bg-red-30 p-5'>
        <div>
          <div className='text-2xl'>
            <p>OLALEKAN</p>
            <p>OLADIMEJI</p>
          </div>
          <p className='text-[10px]'>Full-Stack Web Developer</p>
        </div>
        <div className='space-y-1'>
          <div className='flex gap-1 text-[8px]'>
            <div className='size-3 bg-slate-900 text-white flex items-center justify-center rounded-sm'>
              <LocationOnOutlined sx={{fontSize: 9}} />
            </div>
            <p>17 Folorunsho Street, Ikeja, Lagos, Nigeria</p>
          </div>
          <div className='flex gap-1 text-[8px]'>
          <div className='size-3 bg-slate-900 text-white flex items-center justify-center rounded-sm'>
              <Call sx={{fontSize: 9}} />
            </div>
            <p>07037887923</p>
          </div>
          <div className='flex gap-1 text-[8px]'>
          <div className='size-3 bg-slate-900 text-white flex items-center justify-center rounded-sm'>
              <Email sx={{fontSize: 9}} />
            </div>
            <p>elijahdimeji549@gmail.com</p>
          </div>
          <div className='flex gap-1 text-[10px]'>
            <div className='size-3 bg-red-300 flex items-center justify-center'>
              
            </div>
            <p>www.hghsgjhqbgjh.com</p>
          </div>
        </div>
      </div>
      <div className='relative'>
        <div className='absolute w-40 bg-gray-800 h-[3px] bottom-full rounded-t-xl'></div>
      <hr />

      </div>

      <div className='flex justify-between items-center mt-8'>
        <div className='w-1/3 bg-red-20 h-20 border-r-2 border-gray-800'>
          <div className='size-20 rounded-full mx-auto'>
            <img src={ola} className='w-full h-full rounded-full object-cover' />
          </div>
        
        </div>
        <div className='w-2/3 bg-red-40 h-20'></div>
      </div>
      
    </div>
  )
}

export default Test
