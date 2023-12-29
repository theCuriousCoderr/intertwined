import { ArrowBack, CreateOutlined, LocationOnOutlined } from '@mui/icons-material'
import { green } from '@mui/material/colors'
import React, { useState } from 'react'

function ProfilePage({user}) {
  const [changeDetails, setChangeDetails] = useState("")
  let firstName = user.fullName.split(" ")[0]
  let lastName = user.fullName.split(" ")[1]
  return (
    <div onClick={(e)=> {e.stopPropagation()}} className={` ${changeDetails === "" ? "bg-white" : "bg-black bg-opacity-60"} h-full`}>
      { changeDetails !== "" && <div onClick={(e)=> {e.stopPropagation(); setChangeDetails("")}} className='absolute bg-red-500 w-full bottom-0 rounded-t-3xl fadeInDown'>
        {changeDetails === "photo" && 
        <div>
          <div className="p-5">
          <p id="top" className="text-2xl font-bold varela">
          Edit photo
        </p>
            </div>
            <div className='w-full rounded-full flex items-center justify-center my-5'>
              <img src={user.photo} className="size-48 rounded-full object-cover" />
              </div>
              <div className='mb-10'>
                <button className='w-full'>Change Image</button>
              </div>
          </div>}
        </div>}
      <div className='relative flex items-center justify-center py-5 border-b border-slate-300'>
        <div className='absolute w-full left-5'>
          <ArrowBack />
        </div>
        <p id="top" className="text-lg font-bold varela">
          Profile
        </p>
      </div>

      <div className='p-5 border-b border-slate-300 flex'>
        <div className='w-40 flex items-center justify-center bg-red-20'>
        <div className='size-20 rounded-full relative bg-red-700'>
          <div className='absolute top-0 left-0 p-1 size-5 rounded-full bg-white'>
            <div className='w-full h-full rounded-full bg-green-600'></div>
          </div>
          {/* pen */}
          <div onClick={(e)=> {e.stopPropagation(); setChangeDetails("photo")}} className='absolute size-7 bottom-0 right-0 rounded-full p-[2px] bg-green-600'>
            <div className=' w-full h-full rounded-full bg-white'>
              <div className='flex items-center justify-center w-full h-full pl-[1px pt-[1px'>
                <CreateOutlined sx={{fontSize: 15, color: green[800]}} />
              </div>
            </div>
          </div>
          <img src={user.photo} className='w-full h-full object-cover rounded-full' />
        </div>
        </div>
       
        <div className='space-y-1'>
          <p className="ml-6 bg-red-20 font-semibold text-lg" >{ firstName + " " + lastName[0]}.</p>
          <div className='flex gap-2 items-start'>
          <div className="bg-red-30 w-10 text-sm text-slate-600">
            <LocationOnOutlined sx={{ fontSize: 20 }} />
          </div>
          <p className='text-sm'>{user.address} </p>
          </div>
          <p className="ml-6 bg-red-20 text-slate-500" >{user.email}</p>
          
                  
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
