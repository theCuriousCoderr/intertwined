import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../landing_page/Header";
import logo from "../images/logo.png";
import {
  RemoveRedEyeOutlined,
  ReportProblemOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
let dotEnv = import.meta.env;
import putHook from "../../apiHooks/putHook";
import ToastAlert from "../../components/ToastAlert";

function ForgotPassword() {
  const [logInButtonState, setLogInButtonState] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [samePassword, setSamePassword] = useState(true);
  const [toastInfo, setToastInfo] = useState({
    color: "",
    text: "",
  });
  const [changePasswordDetails, setChangePasswordDetails] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
    tag: "password",
  });
  const navigate = useNavigate();

  useEffect(()=> {
    let title = document.querySelector("title");
    title.innerHTML = "intertwined | Forgot Password";
  }, [])

  function handlePasswordFormChange(e) {
    setSamePassword(true);
    let name = e.target.name;
    let val = e.target.value.trim();
    setChangePasswordDetails({ ...changePasswordDetails, [name]: val });
  }

  let baseURL;
  if (dotEnv.MODE === "development") {
    baseURL = dotEnv.VITE_DEV_URL;
  } else {
    baseURL = dotEnv.VITE_PROD_URL;
  }

  async function handlePasswordFormSubmit(e) {
    setLogInButtonState(false);
    e.preventDefault();
    if (
      changePasswordDetails.newPassword !==
      changePasswordDetails.confirmPassword
    ) {
      setToastInfo({
        color: "blue",
        text: ["Warning!", "New Password and Confirm Password doesn't match"],
      });
      setSamePassword(false);
    } else {
      let url = baseURL + "/change-user-details";
      let response = await putHook(url, changePasswordDetails);
      if (response.success) {
        setChangePasswordDetails({
          email: "",
          newPassword: "",
          confirmPassword: ""
        })
        setToastInfo({ color: "green", text: ["Success!", response.success] });
        setTimeout(() => {
          setToastInfo({ color: "", text: "" });
          navigate("/login")
        }, 3000);
      } else if (response.warning) {
        setToastInfo({ color: "blue", text: ["Warning!", response.warning] });
      } else {
        console.log(response.error);
        setToastInfo({ color: "red", text: ["Error!", response.error] });
      }
    }

    setTimeout(() => {
      setToastInfo({ color: "", text: "" });
    }, 3000);
    setLogInButtonState(true);
  }
  return (
    <div className="relative ">
      {toastInfo.text !== "" && (
        <ToastAlert color={toastInfo.color} text={toastInfo.text} />
      )}
      <div className="fixed -z-10 bg-red-600 h-40 lg:h-screen w-full lg:px-10">
        <div className="absolute lg:hidden left-0 w-full h-20 -bottom-10 rounded-full bg-red-600"></div>
      </div>
      <div className="px-5 py-9 bg-red-40 lg:px-10 lg:w-full lg:h-screen lg:flex lg:flex-wrap lg:items-center lg:justify-center">
        <NavLink
          to="/"
          className="lg:hidden flex items-center gap-1 bg-red-30 w-40 lg:absolute lg:z-10 lg:w-full lg:justify-center"
        >
          <div className="w-6 lg:hidden">
            <img src={logo} />
          </div>
          <p
            className={`text-lg text-slate-100 varela font-bold text-center lg:text-5xl lg:tracking-[6rem]`}
          >
            intertwined
          </p>
        </NavLink>

        <div className="hidden lg:flex items-center gap-1 bg-red-30 w-40 lg:absolute lg:z-10 lg:w-full lg:justify-center">
          <div className="w-6 lg:hidden">
            <img src={logo} />
          </div>
          <p
            className={`text-lg text-slate-100 varela font-bold text-center lg:text-5xl lg:tracking-[5rem]`}
          >
            intertwined
          </p>
        </div>

        <div className="w-full hidden lg:flex lg:flex-wrap">
          <NavLink to="/" className="w-20 mx-auto">
            <div className="w-20 aspect-video">
              <img src={logo} className=" object-cover" />
            </div>
          </NavLink>
          <div className="w-full">
            <p className="varela text-2xl tracking-widest font-semibold text-center">Change Password</p>
          </div>
        </div>

        <form
          onSubmit={handlePasswordFormSubmit}
          className="bg-red-700 lg:relative lg:hidde lg:z-20 rounded-lg my-5 shadow shadow-red-600 px-3 lg:px-5 py-5 space-y-3 md:w-2/3 lg:max-w-96 lg:h-auto md:mx-auto"
        >
          <p className="font-semibold text-sm md:text-xl lg:text-base text-red-200">Change your password</p>

          <div>
            <label htmlFor="email" className="text-xs font-semibold md:text-base lg:text-sm text-slate-200">
              Email
            </label>
            <div className="group p-1 focus-within:bg-emerald-400 focus-within:bg-opacity-80 rounded-lg">
              <input
              required
                id="email"
                name="email"
                type="email"
                value={changePasswordDetails.email}
                onChange={handlePasswordFormChange}
                className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm h-10 md:text-base"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <label htmlFor="newPassword" className="text-xs font-semibold md:text-base lg:text-sm text-slate-200">
                New Password
              </label>
            </div>
            {showPassword ? (
              <div className="relative group p-1 box-content focus-within:bg-emerald-400 focus-within:bg-opacity-80 rounded-lg h-10">
                <button
                 type="button"
                  onClick={() => setShowPassword(false)}
                  className="absolute text-xs font-semibold bg-red-20 flex items-center justify-center w-10 top-1 bottom-1 right-1"
                >
                  <VisibilityOffOutlined sx={{ fontSize: 20 }} />
                </button>
                <input
                  minLength={5}
                  required
                  id="newPassword"
                  name="newPassword"
                  value={changePasswordDetails.newPassword}
                  onChange={handlePasswordFormChange}
                  className="group-focus:ring-orange-500 outline-none ring-1 w-full h-full rounded-md p-1 text-sm md:text-base "
                />
              </div>
            ) : (
              <div className="relative group p-1 box-content focus-within:bg-emerald-400 focus-within:bg-opacity-80 rounded-lg h-10">
                <button
                 type="button"
                  onClick={() => setShowPassword(true)}
                  className="absolute text-xs font-semibold bg-red-20 flex items-center justify-center w-10 top-1 bottom-1 right-1"
                >
                  <RemoveRedEyeOutlined sx={{ fontSize: 20 }} />
                </button>
                <input
                  type="password"
                  minLength={5}
                  required
                  id="newPassword"
                  name="newPassword"
                  value={changePasswordDetails.newPassword}
                  onChange={handlePasswordFormChange}
                  className="group-focus:ring-orange-500 outline-none ring-1 w-full h-full rounded-md p-1 text-sm md:text-base "
                />
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between">
              <label
                htmlFor="confirmPassword"
                className="text-xs md:text-base font-semibold lg:text-sm text-slate-200"
              >
                Confirm Password
              </label>
            </div>
            {showPassword ? (
              <div className="relative group p-1 box-content focus-within:bg-emerald-400 focus-within:bg-opacity-80 rounded-lg h-10">
                <button
                 type="button"
                  onClick={() => setShowPassword(false)}
                  className="absolute text-xs font-semibold bg-red-20 flex items-center justify-center w-10 top-1 bottom-1 right-1"
                >
                  <VisibilityOffOutlined sx={{ fontSize: 20 }} />
                </button>
                <input
                  minLength={5}
                  required
                  id="confirmPassword"
                  name="confirmPassword"
                  value={changePasswordDetails.confirmPassword}
                  onChange={handlePasswordFormChange}
                  className="group-focus:ring-orange-500 outline-none ring-1 w-full h-full rounded-md p-1 text-sm md:text-base"
                />
              </div>
            ) : (
              <div className="relative group p-1 box-content focus-within:bg-emerald-400 focus-within:bg-opacity-80 rounded-lg h-10">
                <button
                type="button"
                  onClick={() => setShowPassword(true)}
                  className="absolute text-xs font-semibold bg-red-20 flex items-center justify-center w-10 top-1 bottom-1 right-1"
                >
                  <RemoveRedEyeOutlined sx={{ fontSize: 20 }} />
                </button>
                <input
                  type="password"
                  minLength={5}
                  required
                  id="confirmPassword"
                  name="confirmPassword"
                  value={changePasswordDetails.confirmPassword}
                  onChange={handlePasswordFormChange}
                  className="group-focus:ring-orange-500 outline-none ring-1 w-full h-full rounded-md p-1 text-sm md:text-base "
                />
              </div>
            )}
            {!samePassword && (
              <div className="text-teal-300 text-[10px] flex items-center gap-1">
                <ReportProblemOutlined sx={{ fontSize: 15 }} />{" "}
                <span>New Password and Confirm Password doesn't match</span>
              </div>
            )}
          </div>

          <div className="my-5">
            {logInButtonState ? (
              <button className="bg-red-500 hover:bg-red-900 p-2 w-full text-center text-white varela rounded-md h-10 lg:text-sm">
                Change Password
              </button>
            ) : (
              <button
                disabled
                className="bg-gray-300 relative p-2 w-full text-center text-gray-300 varela rounded-md h-10"
              >
                <div className="absolute left-[45%] border-2 border-t-black border-b-gray-950 border-l-gray-300 border-r-gray-300 size-5 rounded-full animate-spin lg:text-sm"></div>
                Change Password
              </button>
            )}

            <p className="text-red-200 text-xs text-center md:text-xl lg:text-sm my-5">
              Go back to{" "}
              <button
               type="button"
                className="text-green-500 active:text-green-500"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
