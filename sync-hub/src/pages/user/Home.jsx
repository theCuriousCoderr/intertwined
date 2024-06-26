import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getHook from "../../apiHooks/getHook";
import FootNavBar from "../../components/FootNavBar";
import SideNavBar from "../../components/SideNavBar";
import AllRequests from "./user_screens/AllRequests";
import YourRequests from "./user_screens/YourRequests";
import AddRequest from "./user_screens/AddRequest";
import Messages from "./user_screens/Messages";
import Alerts from "./user_screens/Alerts";
import { io } from "socket.io-client";
import ProfilePage from "./user_screens/ProfilePage";
import { Avatar } from "@mui/material";
let dotEnv = import.meta.env;

let baseURL, feURL
if (dotEnv.MODE === "development") {
  baseURL = dotEnv.VITE_DEV_URL
  feURL = "http://localhost:5173"
} else {
  baseURL = dotEnv.VITE_PROD_URL
  feURL = "https://intertwined-fe.vercel.app"
}


function Home({user, setUser, theme, navItem, setNavItem, showSideNavBar, setShowSideNavBar, newMessage, setSendersList, sendersList, sideNavBarExtend, setSideNavBarExtend, setClientContent }) {
  
  const navigate = useNavigate();


  useEffect(() => {
    setClientContent("");
    async function verifyUser() {
      let token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      token = JSON.parse(token);
      try {
        let url = baseURL + "/user/home";
        let response = await getHook(url, true);
        if (response.success) {
          let fullName = response.success.fullName.split(" ").map(items => items[0].toUpperCase()+items.slice(1)).join(" ")
          setUser({...response.success, fullName: fullName});
        } else {
          setUser("Error");
        }
      } catch (error) {
        console.log(error);
        setUser("Error");
      }
    }
    verifyUser();
  }, []);


 

  return (
    <div className={`relative ${
      theme === "lightMode"
        ? "bg-gradient-to-br from-purple-800 to-blue-600 h-full"
        : "bg-gray-900 h-full"
    }`}>
      {user === "" && (
        <div className="h-full w-full bg-red-5 absolute flex items-center p-3">
          <div className="relative h-1 w-full rounded-full bg-slate-300 overflow-hidden">
            <div className="progress left-right  h-full rounded-full w-full bg-pink-600"></div>
          </div>
        </div>
      )}

      {user === "Error" && (
        <div className="flex items-center justify-center flex-col h-screen">
          <p className="font-medium text-red-600">Unauthorized Access!</p>
          <div className="bg-gray-400 w-36 h-5"></div>
          <div className=""></div>
          <div className="text-lg text-white text-center font-medium">
            <p>Back to{" "}</p>
            <button
              onClick={() => navigate("/login")}
              className="underline underline-offset-1 text-blue-700 active:text-green-500"
            >
              Log In
            </button>
            <br /> <p>or try refreshing the page.</p>
          </div>
        </div>
      )}

      { user.email && navigate("/user/all-requests")}

    </div>
  );
}

export default Home;