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
      <div className="fixed -z-10 bg-red-600 h-40 w-full lg:w-2/3">
        <div className="absolute left-0 w-full h-20 -bottom-10 rounded-full bg-red-600"></div>
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

        <form
          onSubmit={handlePasswordFormSubmit}
          className="bg-slate-50 rounded-lg my-5 shadow shadow-slate-600 px-3 py-5 space-y-3 md:w-2/3 md:mx-auto"
        >
          <p className="font-semibold text-sm md:text-xl">Change your password</p>

          <div>
            <label htmlFor="email" className="text-xs font-semibold md:text-base">
              Email
            </label>
            <div className="group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
              <input
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
              <label htmlFor="newPassword" className="text-xs font-semibold md:text-base">
                New Password
              </label>
            </div>
            {showPassword ? (
              <div className="relative group p-1 box-content focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg h-10">
                <div
                  onClick={() => setShowPassword(false)}
                  className="absolute text-xs font-semibold bg-red-20 flex items-center justify-center w-10 h-full top-0 right-0"
                >
                  <VisibilityOffOutlined sx={{ fontSize: 20 }} />
                </div>
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
              <div className="relative group p-1 box-content focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg h-10">
                <div
                  onClick={() => setShowPassword(true)}
                  className="absolute text-xs font-semibold bg-red-20 flex items-center justify-center w-10 h-full top-0 right-0"
                >
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
                  className="group-focus:ring-orange-500 outline-none ring-1 w-full h-full rounded-md p-1 text-sm md:text-base "
                />
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between">
              <label
                htmlFor="confirmPassword"
                className="text-xs md:text-base font-semibold"
              >
                Confirm Password
              </label>
            </div>
            {showPassword ? (
              <div className="relative group p-1 box-content focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg h-10">
                <div
                  onClick={() => setShowPassword(false)}
                  className="absolute text-xs font-semibold bg-red-20 flex items-center justify-center w-10 h-full top-0 right-0"
                >
                  <VisibilityOffOutlined sx={{ fontSize: 20 }} />
                </div>
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
              <div className="relative group p-1 box-content focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg h-10">
                <div
                  onClick={() => setShowPassword(true)}
                  className="absolute text-xs font-semibold bg-red-20 flex items-center justify-center w-10 h-full top-0 right-0"
                >
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
                  className="group-focus:ring-orange-500 outline-none ring-1 w-full h-full rounded-md p-1 text-sm md:text-base "
                />
              </div>
            )}
            {!samePassword && (
              <div className="text-red-600 text-[10px] flex items-center gap-1">
                <ReportProblemOutlined sx={{ fontSize: 15 }} />{" "}
                <span>New Password and Confirm Password doesn't match</span>
              </div>
            )}
          </div>

          <div className="my-5">
            {logInButtonState ? (
              <button className="bg-orange-500 active:bg-green-500 p-2 w-full text-center text-white varela rounded-md h-10">
                Change Password
              </button>
            ) : (
              <button
                disabled
                className="bg-gray-300 relative p-2 w-full text-center text-gray-300 varela rounded-md h-10"
              >
                <div className="absolute left-[45%] border-2 border-t-black border-b-gray-950 border-l-gray-300 border-r-gray-300 size-5 rounded-full animate-spin"></div>
                Change Password
              </button>
            )}

            <p className="text-black text-xs text-center md:text-xl my-5">
              Go back to{" "}
              <span
                className="text-orange-500 active:text-green-500"
                onClick={() => navigate("/login")}
              >
                Log in
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
