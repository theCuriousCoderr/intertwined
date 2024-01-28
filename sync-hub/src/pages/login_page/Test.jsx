import React, { useEffect, useState } from "react";
import ola from "../../pages/images/ola.jpg";
import { AddHome, AddHomeOutlined, AddRounded, Call, Email, LocationOnOutlined, Mail, Person, PersonOutlined, WatchLater, WatchLaterOutlined, WifiCalling3 } from "@mui/icons-material";
import { Link } from "@mui/material";


function Arrow() {
  let color = "bg-gradient-to-r from-gray-500 to-red-600"
  return (
    <div className="space-y-[.3px]">
        <div className="flex">
          <div className={`size-1 rounded-full ${color}`}></div>
          <div className={`size-1 rounded-full ${color}`}></div>
        </div>
        <div className="flex ml-1">
          <div className={`size-1 rounded-full ${color}`}></div>
          <div className={`size-1 rounded-full ${color}`}></div>
        </div>
        <div className="flex ml-2">
          <div className={`size-1 rounded-full ${color}`}></div>
          <div className={`size-1 rounded-full ${color}`}></div>
        </div>
        <div className="flex ml-1">
          <div className={`size-1 rounded-full ${color}`}></div>
          <div className={`size-1 rounded-full ${color}`}></div>
        </div>
        <div className="flex">
          <div className={`size-1 rounded-full ${color}`}></div>
          <div className={`size-1 rounded-full ${color}`}></div>
        </div>
        
      </div>
  )
}




function Test() {

  const [showAddOns, setShowAddOns] = useState(false)
  const [icon, setIcon] = useState("home")

  useEffect(()=> {
    // let addOn = document.getElementById("addOn1")
    // addOn.classList.add("hidden")
  if (!showAddOns) {
     let addOn = document.getElementById("addOn")
    setTimeout(()=> {
      // addOn.classList.remove("hidden")
      addOn.classList.add("hidden")
    }, 400)
  } else {
     let addOn = document.getElementById("addOn")
    addOn.classList.remove("hidden")
  }

  }, [showAddOns])
  

  return (

    <div className="fixed bg-stone-200 h-full w-full flex items-center justify-center">
      <div className="group z-10 relative h-16 w-60 bg-gray-900 rounded-xl p-1">
        
        <div className="z-10 w-full h-full bg-lime-400 rounded-lg group-hover:w-16 flex items-center justify-evenly">
          <Arrow />
          <Arrow />
          <Arrow />
          <Arrow />
          <Arrow />
          <Arrow />
          
        </div>

      </div>
      
    </div>
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


    // <div className="fixed bg-stone-200 h-full w-full flex items-center justify-center">
    //   <div className="relative w-[80%] mx-auto h-20 bg-slate-50 flex justify-center gap-5 rounded-b-2xl">
    //     <div className="absolute w-[40%] h-1 rounded-full left-[30%] bottom-1 bg-gray-700"></div>
    //   <div onClick={()=> setIcon("home")} className={`w-[20%] cursor-pointer transition-all ${icon === "home" ? "text-blue-500" : "text-gray-300 hover:text-pink-300 " } bg-yellow-30 flex flex-col items-center justify-start p-2`}>
    //       <div className="size-7  flex items-center justify-center">
    //       {!(icon === "home") ? <AddHomeOutlined /> : <AddHome /> } 
            
    //       </div>
    //       <p className="text-xs">Home</p>
    //     </div>


    //     <div className="relative w-[25%] bg-yellow-40 cursor-pointer">
    //       <div className="absolute bg-stone-200 w-full aspect-square rounded-full l -top-12 flex items-end justify-center ">
    //         <div onClick={()=> {setShowAddOns(!showAddOns)}} className={`relative w-[70%] aspect-square ${!showAddOns ? "bg-blue-500" : "bg-slate-50 shadow-sm"}  rounded-full mb-2 text-white flex items-center justify-center`}>
              
    //          { showAddOns && <div id="addOn" className={`absolute size-36 -z-10 bg-red-40 rounded-full bottom-0 showAddOn rotate-0 block`}>
    //             <div className="absolute w-[30%] aspect-square left-[35%] rounded-full hover:bg-slate-300 hover:text-black bg-gray-900 flex justify-center items-center">
    //               <Mail />
    //             </div>
    //             <div className="absolute w-[30%] aspect-square left-0 top-[35%] rounded-full hover:bg-slate-300 hover:text-black bg-gray-900 flex justify-center items-center">
    //               <WifiCalling3 />
    //             </div>
    //             <div className="absolute w-[30%] aspect-square right-0 top-[35%] rounded-full hover:bg-slate-300 hover:text-black bg-gray-900 flex justify-center items-center">
    //               <WatchLater />
    //             </div>
    //           </div> }

    //           { !showAddOns && <div id="addOn" className={`absolute size-36 -z-10 bg-red-40 rounded-full bottom-0 hideAddOn`}>
    //             <div className="absolute w-[30%] aspect-square left-[35%] rounded-full bg-gray-900 flex justify-center items-center">
    //               <Mail />
    //             </div>
    //             <div className="absolute w-[30%] aspect-square left-0 top-[35%] rounded-full bg-gray-900 flex justify-center items-center">
    //               <WifiCalling3 />
    //             </div>
    //             <div className="absolute w-[30%] aspect-square right-0 top-[35%] rounded-full bg-gray-900 flex justify-center items-center">
    //               <WatchLater />
    //             </div>
    //           </div> }

    //           <div className={`flex items-center justify-center transition-all z-10 ${!showAddOns ? "rotate-360" : "rotate-45 text-black"}`}>
    //           <AddRounded />
    //           </div>
    //         </div>
    //       </div>
    //     </div>


    //     <div onClick={()=> setIcon("profile")} className={`w-[20%] cursor-pointer transition-all  ${icon === "profile" ? "text-blue-500" : "text-gray-300 hover:text-pink-300" } bg-yellow-30 flex flex-col items-center justify-start p-2`}>
    //       <div className="size-7  flex items-center justify-center">
    //         {!(icon === "profile") ? <PersonOutlined /> : <Person /> } 
    //       </div>
    //       <p className="text-xs">Profile</p>
    //     </div>
        


    //   </div>
    // </div>
  );
}

export default Test;
