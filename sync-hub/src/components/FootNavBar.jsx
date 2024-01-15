import React from "react";
import {
  AddCircleOutline,
  AddCircleOutlineOutlined,
  Article,
  ArticleOutlined,
  Chat,
  ChatOutlined,
  Notifications,
  NotificationsNoneOutlined,
  Summarize,
  SummarizeOutlined,
} from "@mui/icons-material";
import { grey, orange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

function FootNavBar({ navItem, setNavItem, newMessage, sendersList, theme }) {
  let navigate = useNavigate();

  let path = window.location.pathname;

  return (
    <div
      className={`fixed z-40 bottom-0 h-14 left-0 w-full p-2 rounded-t-xl flex justify-between items-center ${
        theme === "lightMode" ? "bg-slate-900" : "bg-slate-50"
      }`}
    >
      {[
        {
          path: "/user/all-requests",
          title: "All requests",
          icon1: <ArticleOutlined />,
          icon2: <ArticleOutlined />,
        },
        {
          path: "/user/your-requests",
          title: "Your requests",
          icon1: <SummarizeOutlined />,
          icon2: <SummarizeOutlined />,
        },
        {
          path: "/user/add-request",
          title: "Add requests",
          icon1: <ArticleOutlined />,
          icon2: <ArticleOutlined />,
        },
        {
          path: "/user/messages",
          title: "Messages",
          icon1: <ChatOutlined />,
          icon2: <ChatOutlined />,
        },
        {
          path: "/user/alerts",
          title: "Alerts",
          icon1: <NotificationsNoneOutlined />,
          icon2: <NotificationsNoneOutlined />,
        },
      ].map((item) => {
        return !(item.path === "/user/add-request") ? (
          <div
            onClick={() => navigate(item.path)}
            className={`flex flex-col justify-center w-[20%] items-center ${(path === item.path ) ? theme === "lightMode" ? "bg-purple-500 bg-opacity-20 rounded-lg" : "bg-purple-500 bg-opacity-50 rounded-lg" : "bg-transaprent"} `}
          >
            
            {path === item.path ? <div className={` ${theme === "lightMode" ? "text-purple-400" : "text-purple-600" } `}>{item.icon1}</div> : <div className="text-gray-400">{item.icon2}</div>}
            {path === item.path ? (
              <div
                className={`${
                  theme === "lightMode" ? "text-purple-300" : "text-purple-950"
                } size- text-orange-300 rounded-full text-[.6rem] text-center`}
              >
                {item.title}
              </div>
            ) : (
              <div
                className={`size- bg-transparent rounded-full text-[.6rem] text-center ${
                  theme === "lightMode" ? "text-slate-600" : "text-gray-400"
                }`}
              >
                {item.title}
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={() => navigate("/user/add-request")}
            className="-mt-10 w-[20%] h-12 p-1 rounded-full box-border flex justify-center items-center"
          >
            <div className={`p-2 flex flex-col justify-center items-center w-full aspect-square ${theme === "lightMode" ? "bg-slate-900" : "bg-slate-50"} rounded-full`}>
              <div className={`w-full h-full rounded-full ${!(path === item.path) ? "bg-gradient-to-r from-yellow-300 to-pink-700" : "bg-purple-600" }  flex items-center justify-center`}>
              {path === "/user/add-request" ? (
                <AddCircleOutlineOutlined
                  sx={{ fontSize: 30, color: orange[50] }}
                />
              ) : (
                <AddCircleOutlineOutlined
                  sx={{ fontSize: 30, color: grey[100] }}
                />
              )}
              </div>
              
            </div>
          </div>
        );
      })}

      {/* <div onClick={()=> navigate("/user/all-requests")} className="flex flex-col justify-center w-[20%] items-center bg-yellow-30">
      {path === "/user/all-requests" ? <ArticleOutlined sx={{fontSize: 30, color: orange[500]}} /> : <ArticleOutlined sx={{fontSize: 30, color: grey[500]}} />}
      {path === "/user/all-requests" ? <div className={`${theme === "lightMode" ? "text-orange-300" : "text-orange-600"} size- text-orange-300 rounded-full text-[.6rem] text-center`}>All requests</div> : <div className={`size- bg-transparent text-white rounded-full text-[.6rem] text-center ${theme === "lightMode" ? "text-white" : "text-gray-500"}`}>All requests</div>}
    </div>

    <div onClick={()=> navigate("/user/your-requests")} className="flex flex-col justify-center w-[20%] items-center bg-yellow-30">
      {path === "/user/your-requests" ? <SummarizeOutlined sx={{fontSize: 30, color: orange[500]}} /> : <SummarizeOutlined sx={{fontSize: 30, color: grey[500]}} />}
      {path === "/user/your-requests" ? <div className={`${theme === "lightMode" ? "text-orange-300" : "text-orange-600"} size- text-orange-300 rounded-full text-[.6rem] text-center`}>Your requests</div> : <div className={`size- bg-transparent text-white rounded-full text-[.6rem] text-center ${theme === "lightMode" ? "text-white" : "text-gray-500"}`}>Your requests</div>}
    </div>

    <div onClick={()=> navigate("/user/add-request")} className="-mt-10 w-[20%] h-12 shadow shadow-slate-300 p-1 rounded-full box-border flex justify-center items-center">
      <div className="flex flex-col justify-center items-center size-10 bg-orange-500 rounded-full">
      {path === "/user/add-request" ? <AddCircleOutlineOutlined sx={{fontSize: 30, color: orange[50]}} /> : <AddCircleOutlineOutlined sx={{fontSize: 30, color: grey[500]}} />}
       </div> 
     
    </div>

    <div onClick={()=> navigate("/user/messages")} className="relative flex flex-col justify-center w-[20%] items-center bg-yellow-30">
      {((newMessage) && (sendersList.length >= 1)) && <div className='size-3 bg-red-600 rounded-full absolute top-0 right-2'></div>}
      {path === "/user/messages" ? <ChatOutlined sx={{fontSize: 30, color: orange[500]}} /> : <ChatOutlined sx={{fontSize: 30, color: grey[500]}} />}
      {path === "/user/messages" ? <div className={`${theme === "lightMode" ? "text-orange-300" : "text-orange-600"} size- text-orange-300 rounded-full text-[.6rem] text-center`}>Messages</div> : <div className={`size- bg-transparent text-white rounded-full text-[.6rem] text-center ${theme === "lightMode" ? "text-white" : "text-gray-500"}`}>Messages</div>}
    </div>

    <div onClick={()=> navigate("/user/alerts")} className="flex flex-col justify-center w-[20%] items-center bg-yellow-30">
      {path === "/user/alerts" ? <NotificationsNoneOutlined sx={{fontSize: 30, color: orange[500]}} /> : <NotificationsNoneOutlined sx={{fontSize: 30, color: grey[500]}} />}
      {path === "/user/alerts" ? <div className={`${theme === "lightMode" ? "text-orange-300" : "text-orange-600"} size- text-orange-300 rounded-full text-[.6rem] text-center`}>Alerts</div> : <div className={`size- bg-transparent text-white rounded-full text-[.6rem] text-center ${theme === "lightMode" ? "text-white" : "text-gray-500"}`}>Alerts</div>}
    </div> */}
    </div>
  );
}

export default FootNavBar;
