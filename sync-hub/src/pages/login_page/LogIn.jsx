import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../landing_page/Header";
import logo from "../images/logo.png";
import {
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
let dotEnv = import.meta.env;
import postHook from "../../apiHooks/postHook";
import ToastAlert from "../../components/ToastAlert";

function Login() {
  const [logInButtonState, setLogInButtonState] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [toastInfo, setToastInfo] = useState({
    color: "",
    text: "",
  });
  const [logInDetails, setLogInDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    let title = document.querySelector("title");
    title.innerHTML = "intertwined | Log In";
  }, []);

  function handleLogInFormChange(e) {
    let name = e.target.name;
    let val = e.target.value;
    setLogInDetails({ ...logInDetails, [name]: val });
  }

  let baseURL;
  if (dotEnv.MODE === "development") {
    baseURL = dotEnv.VITE_DEV_URL;
  } else {
    baseURL = dotEnv.VITE_PROD_URL;
  }

  async function handleLogInFormSubmit(e) {
    setLogInButtonState(false);
    e.preventDefault();
    let url = baseURL + "/login";
    let response = await postHook(url, logInDetails);
    if (response.success) {
      localStorage.setItem("token", JSON.stringify(response.success));
      setTimeout(() => {
        navigate("/user/home");
      }, 2000);
      setToastInfo({
        color: "green",
        text: ["Success!", "User Login Successful"],
      });
    } else if (response.warning) {
      setToastInfo({ color: "blue", text: ["Warning!", response.warning] });
    } else {
      console.log(response.error);
      setToastInfo({ color: "red", text: ["Error!", response.error] });
    }
    setTimeout(() => {
      setToastInfo({ color: "", text: "" });
    }, 3000);
    window.scrollTo(0, 0);
    setLogInButtonState(true);
  }
  return (
    <div className="relative ">
      {toastInfo.text !== "" && (
        <ToastAlert color={toastInfo.color} text={toastInfo.text} />
      )}
      <div className="fixed -z-10 bg-orange-500 h-40 lg:h-screen w-full lg:px-10">
        <div className="absolute lg:hidden left-0 w-full h-20 -bottom-10 rounded-full bg-orange-500"></div>
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
            className={`text-lg text-slate-100 varela font-bold text-center lg:text-5xl lg:tracking-[5rem]`}
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
            <p className="varela text-2xl tracking-widest font-semibold text-center">Login</p>
          </div>
        </div>

        <form
          onSubmit={handleLogInFormSubmit}
          className="bg-slate-50 lg:relative lg:hidde lg:z-20 rounded-lg my-5 shadow shadow-slate-600 px-3 py-5 space-y-3 md:w-2/3 lg:max-w-96 lg:h-auto md:mx-auto"
        >
          <p className="font-semibold text-sm md:text-xl lg:text-base">
            Welcome back !
          </p>

          <div>
            <label
              htmlFor="email"
              className="text-xs md:text-base lg:text-sm font-semibold"
            >
              Email
            </label>
            <div className="relative group p-1 box-content focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg h-10">
              <input
                disabled={!logInButtonState}
                required
                id="email"
                name="email"
                type="email"
                value={logInDetails.email}
                onChange={handleLogInFormChange}
                className="group-focus:ring-orange-500 outline-none ring-1 w-full h-full rounded-md p-1 text-sm md:text-base"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="text-xs font-semibold md:text-base lg:text-sm"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-xs md:text-base lg:text-xs text-orange-500"
              >
                Forgot your password?
              </button>
            </div>
            {showPassword ? (
              <div className="relative group p-1 box-content focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg h-10">
                <button
                  disabled={!logInButtonState}
                  type="button"
                  onClick={() => setShowPassword(false)}
                  className="absolute text-xs font-semibold bg-red-20 flex items-center justify-center w-10 top-1 bottom-1 right-1"
                >
                  {!logInButtonState ? (
                    <VisibilityOffOutlined
                      sx={{ fontSize: 20, color: "gray" }}
                    />
                  ) : (
                    <VisibilityOffOutlined sx={{ fontSize: 20 }} />
                  )}
                </button>
                <input
                  disabled={!logInButtonState}
                  minLength={5}
                  required
                  id="password"
                  name="password"
                  value={logInDetails.password}
                  onChange={handleLogInFormChange}
                  className="group-focus:ring-orange-500 outline-none ring-1 w-full h-full rounded-md p-1 text-sm md:text-base"
                />
              </div>
            ) : (
              <div className="relative group p-1 box-content focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg h-10">
                <button
                  disabled={!logInButtonState}
                  type="button"
                  onClick={() => setShowPassword(true)}
                  className="absolute text-xs font-semibold bg-red-20 flex items-center justify-center w-10 top-1 bottom-1 right-1 md:text-base"
                >
                  {!logInButtonState ? (
                    <RemoveRedEyeOutlined
                      sx={{ fontSize: 20, color: "gray" }}
                    />
                  ) : (
                    <RemoveRedEyeOutlined sx={{ fontSize: 20 }} />
                  )}
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
                  className="group-focus:ring-orange-500 outline-none ring-1 w-full h-full rounded-md p-1 text-sm md:text-base"
                />
              </div>
            )}
          </div>

          <div className="my-5">
            {logInButtonState ? (
              <button
                type="submit"
                className="bg-orange-500 active:bg-green-500 p-2 w-full h-10 text-center text-white varela rounded-md md:text-xl lg:text-sm"
              >
                Login
              </button>
            ) : (
              <button
                type="submit"
                disabled
                className="bg-gray-300 text-gray-300 relative p-2 w-full h-10 text-center varela rounded-md h- md:text-xl"
              >
                <div className="absolute left-[45%] border-2 border-t-black border-b-gray-950 border-l-gray-300 border-r-gray-300 size-5 rounded-full animate-spin"></div>
                Login
              </button>
            )}
            <p className="text-black text-sm text-center my-5 md:text-xl lg:text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-orange-500 active:text-green-500"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
