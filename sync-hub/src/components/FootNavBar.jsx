import React from 'react';
import { AddCircleOutline, AddCircleOutlineOutlined, Article, ArticleOutlined, Chat, ChatOutlined, Notifications, NotificationsNoneOutlined, Summarize, SummarizeOutlined } from "@mui/icons-material";
import { grey, orange } from "@mui/material/colors";
import { useNavigate } from 'react-router-dom';

function FootNavBar({navItem, setNavItem, newMessage, sendersList, theme}) {
  let navigate = useNavigate()
  let path = window.location.pathname
  return (
    <div className={`fixed z-40 bottom-0 h-14 left-0 w-full p-2 rounded-t-xl flex justify-between items-center ${theme === "lightMode" ? "bg-slate-900" : "bg-slate-50"}`}>

    <div onClick={()=> navigate("/user/all-requests")} className="flex flex-col justify-center w-[20%] items-center bg-yellow-30">
      {path === "/user/all-requests" ? <ArticleOutlined sx={{fontSize: 30, color: orange[500]}} /> : <ArticleOutlined sx={{fontSize: 30, color: grey[500]}} />}
      {path === "/user/all-requests" ? <div className={`${theme === "lightMode" ? "text-orange-300" : "text-orange-600"} size- text-orange-300 rounded-full text-[.6rem] text-center`}>All requests</div> : <div className={`size- bg-transparent text-white rounded-full text-[.6rem] text-center ${theme === "lightMode" ? "text-white" : "text-gray-400"}`}>All requests</div>}
    </div>

    <div onClick={()=> navigate("/user/your-requests")} className="flex flex-col justify-center w-[20%] items-center bg-yellow-30">
      {path === "/user/your-requests" ? <SummarizeOutlined sx={{fontSize: 30, color: orange[500]}} /> : <SummarizeOutlined sx={{fontSize: 30, color: grey[500]}} />}
      {path === "/user/your-requests" ? <div className={`${theme === "lightMode" ? "text-orange-300" : "text-orange-600"} size- text-orange-300 rounded-full text-[.6rem] text-center`}>Your requests</div> : <div className={`size- bg-transparent text-white rounded-full text-[.6rem] text-center ${theme === "lightMode" ? "text-white" : "text-gray-400"}`}>Your requests</div>}
    </div>

    <div onClick={()=> navigate("/user/add-request")} className="-mt-10 w-[20%] h-12 shadow shadow-slate-300 p-1 rounded-full box-border flex justify-center items-center">
      <div className="flex flex-col justify-center items-center size-10 bg-orange-500 rounded-full">
      {path === "/user/add-request" ? <AddCircleOutlineOutlined sx={{fontSize: 30, color: orange[50]}} /> : <AddCircleOutlineOutlined sx={{fontSize: 30, color: grey[500]}} />}
       </div> 
     
    </div>

    <div onClick={()=> navigate("/user/messages")} className="relative flex flex-col justify-center w-[20%] items-center bg-yellow-30">
      {((newMessage) && (sendersList.length >= 1)) && <div className='size-3 bg-red-600 rounded-full absolute top-0 right-2'></div>}
      {path === "/user/messages" ? <ChatOutlined sx={{fontSize: 30, color: orange[500]}} /> : <ChatOutlined sx={{fontSize: 30, color: grey[500]}} />}
      {path === "/user/messages" ? <div className={`${theme === "lightMode" ? "text-orange-300" : "text-orange-600"} size- text-orange-300 rounded-full text-[.6rem] text-center`}>Messages</div> : <div className={`size- bg-transparent text-white rounded-full text-[.6rem] text-center ${theme === "lightMode" ? "text-white" : "text-gray-400"}`}>Messages</div>}
    </div>

    <div onClick={()=> navigate("/user/alerts")} className="flex flex-col justify-center w-[20%] items-center bg-yellow-30">
      {path === "/user/alerts" ? <NotificationsNoneOutlined sx={{fontSize: 30, color: orange[500]}} /> : <NotificationsNoneOutlined sx={{fontSize: 30, color: grey[500]}} />}
      {path === "/user/alerts" ? <div className={`${theme === "lightMode" ? "text-orange-300" : "text-orange-600"} size- text-orange-300 rounded-full text-[.6rem] text-center`}>Alerts</div> : <div className={`size- bg-transparent text-white rounded-full text-[.6rem] text-center ${theme === "lightMode" ? "text-white" : "text-gray-400"}`}>Alerts</div>}
    </div>
    
   </div> 
  )
}

export default FootNavBar;
