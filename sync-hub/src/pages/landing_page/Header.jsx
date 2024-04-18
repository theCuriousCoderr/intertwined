import logo from "../images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Close, Menu } from "@mui/icons-material";
import {
  ArrowForwardIos,
  ExpandLess,
  ExpandMore,
  LoginOutlined,
} from "@mui/icons-material";
import { useState } from "react";

function Header({ menuBarState, setMenuBarState, showMenu = true, setMenuBarExtend, setMenuBarExtendOption }) {
  const [ourServices, setOurServices] = useState(false);
  const navigate = useNavigate();
  return (
    <header className=" top- w-full z-1 flex justify-between bg-yellow-40 lg:px-10">
      <NavLink to="/" className="flex items-center gap-1">
        <div className="w-6">
          <img src={logo} />
        </div>
        <p
          className={`text-lg ${
            !menuBarState ? "text-slate-200" : "text-orange-500"
          } varela font-bold `}
        >
          intertwined
        </p>
      </NavLink>
      <div className="lg:hidden">
        {menuBarState ? (
          <div
            onClick={() => setMenuBarState(false)}
            className="size-10 flex items-center justify-center hover:bg-slate-200 rounded"
          >
            <Close />
          </div>
        ) : (
          <div
            onClick={() => setMenuBarState(true)}
            className="size-10 flex items-center justify-center bg-slate-200 hover:bg-slate-400 rounded"
          >
            <Menu />
          </div>
        )}
      </div>
      <div className="hidden lg:flex items-center gap-5">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setOurServices(!ourServices);
          }}
          className={`bg-red-20 p-1 rounded ${
            ourServices ? "h-42 bg-slate-200" : "h-8"
          } fadeI overflow-hidden`}
        >
          <div className="flex items-center bg-red-20 justify-between">
            <p
              className={`${
                ourServices ? "text-slate-700" : "text-slate-200"
              } text-sm varela font-medium hover:text-purple-500`}
            >
              Our services
            </p>
            <div className="text-slate-200">{!ourServices ? <ExpandMore sx={{fontSize: 20}} /> : <ExpandLess />}</div>
          </div>
          <div
            hidden={!ourServices}
            className="px-3 bg-red-40 -mt-4 pt-5 fadeIn"
          >
            <div className="font-light space-y-2">
              <p className="">Add sevices request</p>
              <p>View all services requests</p>
              <p>View your services requests </p>
              <p>Have a conversation with a res-shaker </p>
              <p> Receive alerts and notifications</p>
            </div>
          </div>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setMenuBarExtend(true);
            setMenuBarExtendOption("aboutUs");
          }}
          className="flex items-center bg-red-20 justify-between p-1"
        >
          <p className={` text-sm varela text-slate-200 font-medium hover:text-purple-500`}>About Us</p>
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            setMenuBarExtend(true);
            setMenuBarExtendOption("mission");
          }}
          className="flex items-center bg-red-20 justify-between p-1"
        >
          <p className={` text-sm text-slate-200 varela font-medium hover:text-purple-500`}>Mission & Vision</p>
        </div>
        <div className="flex gap-2 items-center">
        <div>
          <button onClick={() => navigate("/login")} className=" py-2 px-3 rounded-md text-sm varela font-medium text-purple-500 hover:bg-purple-200">Log In</button>
        </div>
        <div>
          <button  onClick={() => navigate("/signup")} className="transition-all bg-purple-500 hover:bg-purple-200 hover:text-purple-800 text-slate-200 py-2 px-3 rounded-md text-sm varela font-medium">Get Started</button>
        </div>
        </div>
       
      </div>
    </header>
  );
}

export default Header;
