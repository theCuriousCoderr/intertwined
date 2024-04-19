import {
  ArrowForwardIos,
  ExpandLess,
  ExpandMore,
  LoginOutlined,
} from "@mui/icons-material";
import Header from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MenuBar({
  menuBarState,
  setMenuBarState,
  setMenuBarExtend,
  setMenuBarExtendOption,
}) {
  const [ourServices, setOurServices] = useState(false);
  let navigate = useNavigate();
  return (
    <div className="bg-white box-content border border-slate-500 overflow-scrol fixed right-3 left-3 z-20 fadeIn rounded-lg lg:w-2/3 lg:mx-auto">
      <div className="px-2 py-8">
        <Header menuBarState={menuBarState} setMenuBarState={setMenuBarState} />
      </div>
      <hr className="-mt-6 border" />
      <div className="p-3">
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
                ourServices ? "text-slate-700" : "text-black"
              } text-base md:text-xl varela font-semibold`}
            >
              Our services
            </p>
            <div>{!ourServices ? <ExpandMore /> : <ExpandLess />}</div>
          </div>
          <div
            hidden={!ourServices}
            className="px-3 bg-red-40 -mt-4 pt-5 fadeIn"
          >
            <div className="font-light space-y-2 text-slate-500">
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
          <p className={` text-base  md:text-xl varela font-semibold`}>About Us</p>
          <div className="-rotate-90">
            <ExpandMore />
          </div>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setMenuBarExtend(true);
            setMenuBarExtendOption("mission");
          }}
          className="flex items-center bg-red-20 justify-between p-1"
        >
          <p className={` text-base  md:text-xl varela font-semibold`}>Mission & Vision</p>
          <div className="-rotate-90">
            <ExpandMore />
          </div>
        </div>

        <div
          onClick={() => navigate("/signup")}
          className="px-3 py-1 h-10 md:h-auto md:p-3 rounded-lg bg-green-500 active:bg-green-400"
        >
          <div className="flex items-center justify-center gap-2">
            <div className="size-7 flex items-center justify-center bg-red-40">
              <LoginOutlined sx={{ color: "white" }} />
            </div>
            <p className="font-bold text-slate-50 text-sm  md:text-2xl">Sign Up</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
