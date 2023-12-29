import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../landing_page/Header";
import logo from "../images/logo.png";
import { RemoveRedEyeOutlined, ReportProblemOutlined, VisibilityOffOutlined } from "@mui/icons-material";
let dotEnv = import.meta.env
import putHook from "../../apiHooks/putHook";
import ToastAlert from "../../components/ToastAlert";

function ForgotPassword() {
    const [logInButtonState, setLogInButtonState ] = useState(true)
    const [showPassword, setShowPassword] = useState(false);
    const [samePassword, setSamePassword] = useState(true)
    const [toastInfo, setToastInfo] = useState({
        color: "",
        text: ""
      })
    const [changePasswordDetails, setChangePasswordDetails] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })
    const navigate = useNavigate()
  

    function handlePasswordFormChange(e) {
        setSamePassword(true)
        let name = e.target.name
        let val = e.target.value
        setChangePasswordDetails({...changePasswordDetails,[name]:val})
    }

    let baseURL;
    if (dotEnv.MODE === "development") {
      baseURL = dotEnv.VITE_DEV_URL
    } else {
      baseURL = dotEnv.VITE_PROD_URL
    }

    async function handlePasswordFormSubmit(e) {
        setLogInButtonState(false)
        e.preventDefault();
        // alert(JSON.stringify(changePasswordDetails))
        if (changePasswordDetails.newPassword !== changePasswordDetails.confirmPassword) {
            setToastInfo({color: "blue", text: ["Warning!", "New Password and Confirm Password doesn't match"] })
            setSamePassword(false)
        } else {
            let url = baseURL + "/change-password";
            let response = await putHook(url, changePasswordDetails);
            if (response.success) {
                // localStorage.setItem("token", JSON.stringify(response.success))
                // setTimeout(() => {
                //     navigate("/login")
                // }, 2000);
                setToastInfo({color: "green", text: ["Success!", response.success] })
            } else if (response.warning) {
                setToastInfo({color: "blue", text: ["Warning!", response.warning] })
            } else {
                console.log(response.error)
                setToastInfo({color: "red", text: ["Error!", response.error] })
            }
        }

       
         setTimeout(() => {
            setToastInfo({color: "", text: "" })
        }, 3000);
        // window.scrollTo(0, 0)
        setLogInButtonState(true)
      }
  return (
    <div className="relative">
        {toastInfo.text !== "" && <ToastAlert color={toastInfo.color} text={toastInfo.text} />}
        <div className="fixed -z-10 bg-red-600 h-40 w-full">
            <div className="absolute left-0 w-full h-20 -bottom-10 rounded-full bg-red-600">

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

        <form onSubmit={handlePasswordFormSubmit} className="bg-slate-50 rounded-lg my-5 shadow shadow-slate-600 px-3 py-5 space-y-3">
            <p className="font-semibold text-sm">Change your password</p>
      
            <div>
                <label htmlFor="email" className="text-xs font-semibold">Email</label>
                <div className="group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
                <input id="email" name="email" type="email" value={changePasswordDetails.email} onChange={handlePasswordFormChange} className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm" />
                </div>
            </div>
        

            <div>
            <div className="flex justify-between">
                    <label htmlFor="newPassword" className="text-xs font-semibold">New Password</label>
                    {/* <p className="text-xs text-orange-500">Forgot your password?</p> */}
                </div>
            {showPassword ? <div className="relative group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
              <div onClick={()=> setShowPassword(false)} className="absolute text-xs font-semibold bg-red-20 w-10 right-0 top-2">
                {/* <RemoveRedEyeOutlined sx={{ fontSize: 20 }} /> */}
                <VisibilityOffOutlined sx={{ fontSize: 20 }} />
              </div>
              <input
                minLength={5}
                required
                id="newPassword"
                name="newPassword"
                value={changePasswordDetails.newPassword}
                onChange={handlePasswordFormChange}
                className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
              />
            </div> : 
            <div className="relative group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
            <div onClick={()=> setShowPassword(true)} className="absolute text-xs font-semibold bg-red-20 w-10 right-0 top-2">
            <RemoveRedEyeOutlined sx={{ fontSize: 20 }} />
            </div>
            <input
              type="password"
              minLength={5}
              required
              id="newPassword"
              name="newPassword"
              value={changePasswordDetails.newPassword}
              onChange={handlePasswordFormChange}
              className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
            />
          </div>
            }
          </div>


          <div>
            <div className="flex justify-between">
                    <label htmlFor="confirmPassword" className="text-xs font-semibold">Confirm Password</label>
                    {/* <p className="text-xs text-orange-500">Forgot your password?</p> */}
                </div>
            {showPassword ? <div className="relative group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
              <div onClick={()=> setShowPassword(false)} className="absolute text-xs font-semibold bg-red-20 w-10 right-0 top-2">
                <VisibilityOffOutlined sx={{ fontSize: 20 }} />
              </div>
              <input
                minLength={5}
                required
                id="confirmPassword"
                name="confirmPassword"
                value={changePasswordDetails.confirmPassword}
                onChange={handlePasswordFormChange}
                className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
              />
            </div> : 
            <div className="relative group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
            <div onClick={()=> setShowPassword(true)} className="absolute text-xs font-semibold bg-red-20 w-10 right-0 top-2">
            <RemoveRedEyeOutlined sx={{ fontSize: 20 }} />
            </div>
            <input
              type="password"
              minLength={5}
              required
              id="confirmPassword"
              name="confirmPassword"
              value={changePasswordDetails.confirmPassword}
              onChange={handlePasswordFormChange}
              className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
            />
          </div>
            }
            {!samePassword && 
            <div className="text-red-600 text-[10px] flex items-center gap-1">
                <ReportProblemOutlined sx={{fontSize:15}} /> <span>New Password and Confirm Password doesn't match</span>
            </div>
            }
          </div>

            <div className="my-5">

            { logInButtonState ? <button className="bg-orange-500 active:bg-green-500 p-2 w-full text-center text-white varela rounded-md">
            Change Password
            </button> :
            <button disabled className="bg-gray-300 relative p-2 w-full text-center text-white varela rounded-md">
                <div className="absolute left-[45%] border-2 border-t-black border-b-gray-950 border-l-gray-300 border-r-gray-300 size-5 rounded-full animate-spin">
                </div>
                Change Password
          </button>
            }

            <p className="text-black text-xs text-center my-5">Go back to <span className="text-orange-500 active:text-green-500" onClick={()=> navigate("/login")}>Log in</span></p>
            
            </div>

            

          

        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;

