import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../landing_page/Header";
import logo from "../images/logo.png";
import { RemoveRedEyeOutlined, VisibilityOffOutlined } from "@mui/icons-material";
let dotEnv = import.meta.env
import postHook from "../../apiHooks/postHook";
import ToastAlert from "../../components/ToastAlert";


function Login() {
    const [logInButtonState, setLogInButtonState ] = useState(true)
    const [showPassword, setShowPassword] = useState(false);
    const [toastInfo, setToastInfo] = useState({
        color: "",
        text: ""
      })
    const [logInDetails, setLogInDetails] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    // const signUpDetails = 

    function handleLogInFormChange(e) {
        let name = e.target.name
        let val = e.target.value.trim()
        setLogInDetails({...logInDetails,[name]:val})
    }

    let baseURL;
    if (dotEnv.MODE === "development") {
      baseURL = dotEnv.VITE_DEV_URL
    } else {
      baseURL = dotEnv.VITE_PROD_URL
    }

    async function handleLogInFormSubmit(e) {
        setLogInButtonState(false)
        e.preventDefault();
        let url = baseURL + "/login";
        let response = await postHook(url, logInDetails);
        if (response.success) {
            localStorage.setItem("token", JSON.stringify(response.success))
            setTimeout(() => {
                navigate("/user/home")
            }, 2000);
            setToastInfo({color: "green", text: ["Success!", "User Login Successful"] })
        } else if (response.warning) {
            setToastInfo({color: "blue", text: ["Warning!", response.warning] })
        } else {
            console.log(response.error)
            setToastInfo({color: "red", text: ["Error!", response.error] })
        }
         setTimeout(() => {
            setToastInfo({color: "", text: "" })
        }, 3000);
        window.scrollTo(0, 0)
        setLogInButtonState(true)
      }
  return (
    <div className="relative">
        {toastInfo.text !== "" && <ToastAlert color={toastInfo.color} text={toastInfo.text} />}
        <div className="fixed -z-10 bg-orange-500 h-40 w-full">
            <div className="absolute left-0 w-full h-20 -bottom-10 rounded-full bg-orange-500">

            </div>

        </div>
      <div className="px-5 py-9 bg-red-40">
        <NavLink to="/" className="flex items-center gap-1 bg-red-30 w-40">
          <div className="w-6">
            <img src={logo} />
          </div>
          <p className={`text-lg text-slate-100 varela font-bold`}>
            intertwined
          </p>
        </NavLink>

        <form onSubmit={handleLogInFormSubmit} className="bg-slate-50 rounded-lg my-5 shadow shadow-slate-600 px-3 py-5 space-y-3">
            <p className="font-semibold text-sm">Welcome back !</p>
      
            <div>
                <label htmlFor="email" className="text-xs font-semibold">Email</label>
                <div className="group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
                <input disabled={!logInButtonState} required id="email" name="email" type="email" value={logInDetails.email} onChange={handleLogInFormChange} className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm disabled:text-slate-400 disabled:bg-slate-200" />
                </div>
            </div>
        

            <div>
            <div className="flex justify-between">
                    <label htmlFor="password" className="text-xs font-semibold">Password</label>
                    <button type="button" onClick={()=>navigate("/forgot-password")} className="text-xs text-orange-500">Forgot your password?</button>
                </div>
            {showPassword ? <div className="relative group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
              <button disabled={!logInButtonState} type="button" onClick={()=> setShowPassword(false)} className="absolute text-xs font-semibold bg-red-20 w-10 right-0 top-2">
                {/* <RemoveRedEyeOutlined sx={{ fontSize: 20 }} /> */}
                {!logInButtonState ? <VisibilityOffOutlined sx={{ fontSize: 20 , color: "gray" }} /> : <VisibilityOffOutlined sx={{ fontSize: 20 }} /> }
                {/* <VisibilityOffOutlined sx={{ fontSize: 20 }} /> */}
              </button>
              <input
                disabled={!logInButtonState}
                minLength={5}
                required
                id="password"
                name="password"
                value={logInDetails.password}
                onChange={handleLogInFormChange}
                className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm disabled:text-slate-400 disabled:bg-slate-200"
              />
            </div> : 
            <div className="relative group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
            <button disabled={!logInButtonState} type="button" onClick={()=> setShowPassword(true)} className="absolute text-xs font-semibold bg-red-20 w-10 right-0 top-2">
              {!logInButtonState ? <RemoveRedEyeOutlined sx={{ fontSize: 20 , color: "gray" }} /> : <RemoveRedEyeOutlined sx={{ fontSize: 20 }} /> }
            </button>
            <input
              disabled={!logInButtonState}
              type="password"
              minLength={5}
              required
              id="password"
              name="password"
              value={logInDetails.password}
              onChange={handleLogInFormChange}
              className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm disabled:text-slate-400 disabled:bg-slate-200"
            />
          </div>
            }
          </div>

            <div className="my-5">

            { logInButtonState ? <button type="submit" className="bg-orange-500 active:bg-green-500 p-2 w-full text-center text-white varela rounded-md">
            Login
            </button> :
            <button type="submit" disabled className="bg-gray-300 relative p-2 w-full text-center text-white varela rounded-md">
                <div className="absolute left-[45%] border-2 border-t-black border-b-gray-950 border-l-gray-300 border-r-gray-300 size-5 rounded-full animate-spin">
                </div>
                Login
          </button>
            }


            {/* <button className="bg-orange-500 p-2 w-full text-center text-white varela rounded-md">
                Login
            </button> */}
            <p className="text-black text-xs text-center my-5">Don't have an account? <button type="button" className="text-orange-500 active:text-green-500" onClick={()=> navigate("/signup")}>Sign Up</button></p>
            
            </div>

            

          

        </form>
      </div>
    </div>
  );
}

export default Login;
