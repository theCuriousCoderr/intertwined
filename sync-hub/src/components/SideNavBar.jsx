import React from "react";
import { Help, LogoutOutlined, Person, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

function SideNavBar({
  user,
  setUser,
  setShowSideNavBar,
  setSideNavBarExtend,
  theme,
}) {
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
    <div className="fixed z-50 top-0 bottom-0 w-full bg-green-60 flex slideInLeft ">
      <div
        className={`relative p-2 w-[80%] lg:w-1/3 ${
          theme === "lightMode" ? "bg-white" : "bg-gray-900"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="size-10 flex items-center justify-center rounded-full bg-gray-200">
            {user.photo ? (
              <img
                src={user.photo}
                className={`w-full h-full rounded-full object-cover ${
                  !(theme === "lightMode") && "border border-white"
                }`}
              />
            ) : (
              <Avatar />
            )}
          </div>
          <div className="text-xs">
            <p
              className={`font-medium ${
                theme === "lightMode" ? "text-slate-950" : "text-slate-100"
              }`}
            >
              {user.fullName}
            </p>
            <p
              className={`font-light ${
                theme === "lightMode" ? "text-slate-600" : "text-slate-400"
              }`}
            >
              {user.email}
            </p>
          </div>
        </div>

        <div className="my-3">
          {[
            {
              path: "/profile",
              icon: <Person sx={{ fontSize: 25 }} />,
              text: "Profile",
            },
            {
              path: "/settings",
              icon: <Settings sx={{ fontSize: 25 }} />,
              text: "Settings",
            },
            {
              path: "/complaints",
              icon: <Help sx={{ fontSize: 25 }} />,
              text: "Suggestions / Complaints",
            },
          ].map((items) => {
            return (
              <div
                onClick={() => {
                  navigate(items.path);
                }}
                className={`px-3 py-2 h-10 ${
                  theme === "lightMode"
                    ? "hover:bg-slate-200"
                    : "hover:bg-slate-800"
                }  rounded-md`}
              >
                <div
                  className={`flex items-center gap-5 ${
                    !(theme === "lightMode") && "text-slate-200"
                  }`}
                >
                  <div className="size-7 flex items-center justify-center bg-red-40">
                    {items.icon}
                  </div>
                  <p className="font-normal text-sm">{items.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div
          onClick={logOut}
          className="px-3 py-1 rounded-lg h-10 bg-red-500 active:bg-red-400"
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
