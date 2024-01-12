import React from "react";
import { LogoutOutlined, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

function SideNavBar({ user, setUser, setShowSideNavBar, setSideNavBarExtend, theme }) {
  let navigate = useNavigate();

  function logOut(e) {
    e.stopPropagation();
    localStorage.removeItem("token");
    setUser("");
    setShowSideNavBar(false);
    setTimeout(() => {
      navigate("/");
    }, 200);
  }
  return (
    <div className="fixed z-50 top-0 bottom-0 w-full bg-red-20 flex slideInLeft ">
      <div className={`p-2 w-[80%] space-y-4 ${theme === "lightMode" ? "bg-white" : "bg-gray-900"}`}>
        <div className="flex items-center gap-3">
          <div className="size-10 flex items-center justify-center rounded-full bg-gray-200">
            {user.photo ? <img
              src={user.photo}
              className={`w-full h-full rounded-full object-cover ${!(theme === "lightMode") && "border border-white"}`} 
            /> : <Avatar />}
          </div>
          <div className="text-xs">
            <p className={`font-medium ${theme === "lightMode" ? "text-slate-950" : "text-slate-100"}`}>{user.fullName}</p>
            <p className={`font-light ${theme === "lightMode" ? "text-slate-600" : "text-slate-400"}`}>{user.email}</p>
          </div>
        </div>

        <div onClick={()=> { navigate("/profile") }} className="px-3 py-2 hover:bg-slate-200 rounded-md">
          <div className={`flex items-center gap-5 ${!(theme === "lightMode") && "text-slate-200"}`}>
            <div className="size-7 flex items-center justify-center bg-red-40">
              <Person sx={{ fontSize: 25 }} />
            </div>
            <p className="font-normal text-sm">Profile</p>
          </div>
        </div>

        <div
          onClick={logOut}
          className="px-3 py-1 rounded-lg bg-red-500 active:bg-red-400"
        >
          <div className="flex items-center justify-center gap-2">
            <div className="size-7 flex items-center justify-center bg-red-40">
              <LogoutOutlined sx={{ color: "white" }} />
            </div>
            <p className="font-normal text-slate-50 text-sm">Log Out</p>
          </div>
        </div>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowSideNavBar(false);
        }}
        className="w-[20%] bg-black bg-opacity-50"
      ></div>
    </div>
  );
}

export default SideNavBar;
