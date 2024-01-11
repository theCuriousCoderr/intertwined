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


function Home({user, setUser, navItem, setNavItem, showSideNavBar, setShowSideNavBar, newMessage, setSendersList, sendersList, sideNavBarExtend, setSideNavBarExtend, setClientContent }) {
  
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
          setUser(response.success);
        } else {
          alert(1)
          setUser("Error");
        }
      } catch (error) {
        alert(2)
        console.log(error);
      }
    }
    verifyUser();
  }, []);


 

  return (
    <div>
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
          <p className="text-lg font-medium">
            Back to{" "}
            <button
              onClick={() => navigate("/login")}
              className="underline underline-offset-1 text-blue-700 active:text-green-500"
            >
              Log In
            </button>
          </p>
        </div>
      )}

      { user.email && navigate("/user/all-requests")}



      {/* {user.email && (
        <div>
          { sideNavBarExtend !== "" && 
          <div onClick={()=> setSideNavBarExtend("")} className="absolute bg-white z-50 h-full w-full slideInLeft">
            {sideNavBarExtend === "profile" && <ProfilePage user={user} setUser={setUser} setSideNavBarExtend={setSideNavBarExtend} />}
            </div>}
          <div className="relative h-screen w-full bg-red-20">
            <div className="fixed top-0 w-full flex flex-wrap justify-between items-center p-2 bg-white">
              <div
                onClick={() => setShowSideNavBar(true)}
                className="size-10 flex items-center justify-center rounded-full bg-red-200"
              >
                {user.photo ? <img
                  src={user.photo}
                  alt="User Photo"
                  className="w-full h-full rounded-full object-cover"
                /> : <Avatar /> }
              </div>
              <p className="text-lg varela font-semibold">intertwined</p>
              <div className="size-5 bg-yellow-200"></div>
            </div>

            {showSideNavBar && (
              <SideNavBar user={user} setShowSideNavBar={setShowSideNavBar} setSideNavBarExtend={setSideNavBarExtend} />
            )}

          </div>
        </div>
      )} */}
    </div>
  );
}

export default Home;