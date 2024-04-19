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
      className={`fixed z-40 bottom-0 lg:left-0 lg:top-14 lg:w-40 lg:h-full h-14 left-0 w-full p-2 rounded-t-xl lg:rounded-none flex lg:flex-col lg:justify-normal lg:gap-y-2 justify-between items-center ${
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
          <button
            onClick={() => navigate(item.path)}
            className={`cursor-pointer flex flex-col lg:flex-row lg:gap-2 lg:pl-1 lg:pr-3 lg:py-2 lg:w-full justify-center lg:justify-start w-[20%] items-center ${(path === item.path ) ? theme === "lightMode" ? "bg-purple-500 bg-opacity-20 rounded-lg" : "bg-purple-500 bg-opacity-50 rounded-lg" : "bg-transaprent  hover:bg-purple-500 hover:bg-opacity-20 hover:rounded-md"} `}
          >
            
            {path === item.path ? <div className={` ${theme === "lightMode" ? "text-purple-400" : "text-purple-600" } `}>{item.icon1}</div> : <div className="text-gray-400">{item.icon2}</div>}
            {path === item.path ? (
              <div
                className={`${
                  theme === "lightMode" ? "text-purple-300" : "text-purple-950"
                } lg:text-sm text-orange-300 rounded-full text-[.6rem] text-center`}
              >
                {item.title}
              </div>
            ) : (
              <div
                className={`size- bg-transparent rounded-full text-[.6rem] text-center lg:text-sm ${
                  theme === "lightMode" ? "text-slate-600" : "text-gray-400"
                }`}
              >
                {item.title}
              </div>
            )}
          </button>
        ) : (
          <button
            onClick={() => navigate("/user/add-request")}
            className="cursor-pointer -mt-10 w-[20%] lg:mt-0 lg:w-full h-12 p-1 rounded-full box-border flex justify-center items-center"
          >
            <div className={`p-2 flex flex-col bg-red-400 justify-center items-center w-full lg:w-auto aspect-square ${theme === "lightMode" ? "bg-slate-900" : "bg-slate-50"} rounded-full lg:rounded-none`}>
              <div className={`size-12 lg:size-5 rounded-full ${!(path === item.path) ? "bg-gradient-to-r from-yellow-300 to-pink-700" : "bg-purple-600" }  flex items-center justify-center`}>
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
          </button>
        );
      })}

     
    </div>
  );
}

export default FootNavBar;
