import React from 'react'

function AboutUs() {
  return (
    <div className='mt-5'>
          <p id="top" className="text-lg font-bold varela p-2 border-b border-slate-300">
          About Us
        </p>
      <p> This project was built using the <em>MERN</em> stack.</p>
      <div className='mt-5 space-y-1'>
        <div className='flex items-end'>
            <div className='w-[10%] flex items-center justify-center bg-red-20'>
                <p className='text-2xl font-bold '>M</p>
            </div>
            <p className='text-base font-normal'>ongoDB</p>
        </div>
        <div className='flex items-end'>
            <div className='w-[10%] flex items-center justify-center bg-red-20'>
                <p className='text-2xl font-bold '>E</p>
            </div>
            <p className='text-base font-normal'>xpressJs</p>
        </div>
        <div className='flex items-end'>
            <div className='w-[10%] flex items-center justify-center bg-red-20'>
                <p className='text-2xl font-bold '>R</p>
            </div>
            <p className='text-base font-normal'>eactJs</p>
        </div>
        <div className='flex items-end'>
            <div className='w-[10%] flex items-center justify-center bg-red-20'>
                <p className='text-2xl font-bold '>N</p>
            </div>
            <p className='text-base font-normal'>odeJs</p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
