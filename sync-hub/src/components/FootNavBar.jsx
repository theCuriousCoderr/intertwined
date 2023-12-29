import React from 'react';
import { AddCircleOutline, AddCircleOutlineOutlined, Article, ArticleOutlined, Chat, ChatOutlined, Notifications, NotificationsNoneOutlined, Summarize, SummarizeOutlined } from "@mui/icons-material";
import { grey, orange } from "@mui/material/colors";

function FootNavBar({navItem, setNavItem, newMessage, sendersList}) {
  return (
    <div className="fixed z-40 bottom-0 left-0 w-full p-2 rounded-t-xl bg-slate-100 flex justify-between items-center">

    <div onClick={()=> setNavItem("allRequests")} className="flex flex-col justify-center w-[15%] items-center bg-yellow-30">
      {navItem === "allRequests" ? <ArticleOutlined sx={{fontSize: 30, color: orange[500]}} /> : <ArticleOutlined sx={{fontSize: 30, color: grey[500]}} />}
      {navItem === "allRequests" ? <div className="size-2 bg-orange-500 rounded-full"></div> : <div className="size-2 bg-transparent rounded-full"></div>}
    </div>

    <div onClick={()=> setNavItem("yourRequests")} className="flex flex-col justify-center w-[15%] items-center bg-yellow-30">
      {navItem === "yourRequests" ? <SummarizeOutlined sx={{fontSize: 30, color: orange[500]}} /> : <SummarizeOutlined sx={{fontSize: 30, color: grey[500]}} />}
      {navItem === "yourRequests" ? <div className="size-2 bg-orange-500 rounded-full"></div> : <div className="size-2 bg-transparent rounded-full"></div>}
    </div>

    <div onClick={()=> setNavItem("addRequest")} className="-mt-10 w-[15%] h-12  bg-slate-200 shadow shadow-slate-300 p-1 rounded-full">
      <div className="flex flex-col justify-center items-center w-full h-full bg-orange-500 rounded-full">
      {navItem === "addRequest" ? <AddCircleOutlineOutlined sx={{fontSize: 30, color: orange[50]}} /> : <AddCircleOutlineOutlined sx={{fontSize: 30, color: grey[500]}} />}
       </div> 
     
    </div>

    <div onClick={()=> setNavItem("messages")} className="relative flex flex-col justify-center w-[15%] items-center bg-yellow-30">
      {((newMessage) && (sendersList.length >= 1)) && <div className='size-3 bg-red-600 rounded-full absolute top-0 right-2'></div>}
      {navItem === "messages" ? <ChatOutlined sx={{fontSize: 30, color: orange[500]}} /> : <ChatOutlined sx={{fontSize: 30, color: grey[500]}} />}
      {navItem === "messages" ? <div className="size-2 bg-orange-500 rounded-full"></div> : <div className="size-2 bg-transparent rounded-full"></div>}
    </div>

    <div onClick={()=> setNavItem("alerts")} className="flex flex-col justify-center w-[15%] items-center bg-yellow-30">
      {navItem === "alerts" ? <NotificationsNoneOutlined sx={{fontSize: 30, color: orange[500]}} /> : <NotificationsNoneOutlined sx={{fontSize: 30, color: grey[500]}} />}
      {navItem === "alerts" ? <div className="size-2 bg-orange-500 rounded-full"></div> : <div className="size-2 bg-transparent rounded-full"></div>}
    </div>
    
   </div> 
  )
}

export default FootNavBar;
