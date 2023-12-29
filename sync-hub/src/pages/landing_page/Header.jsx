import logo from "../images/logo.png";
import { NavLink } from "react-router-dom";
import { Close, Menu } from "@mui/icons-material";

function Header({menuBarState,setMenuBarState,showMenu=true }) {
    return (
        <header className=" top- w-full z-1 flex justify-between bg-yellow-40">
        <NavLink to="/" className="flex items-center gap-1">
          <div className="w-6">
            <img src={logo} />
          </div>
          <p className={`text-lg ${!menuBarState ? "text-slate-200 strok" : "text-orange-500"} varela font-bold `}>
            intertwined
          </p>
        </NavLink>
        <div>
          { (menuBarState) ? 
            <div onClick={()=> setMenuBarState(false)} className="size-10 flex items-center justify-center hover:bg-slate-200 rounded">
                <Close />
            </div> : 
            <div onClick={()=> setMenuBarState(true)} className="size-10 flex items-center justify-center bg-slate-200 hover:bg-slate-400 rounded">
                <Menu />
            </div> 
            }
        </div>
      </header>
    )
}

export default Header;