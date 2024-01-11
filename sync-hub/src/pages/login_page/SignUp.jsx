import React, { useEffect, useState } from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import google_logo from "../images/google_logo.png"
import { Avatar } from "@mui/material";
import postHook from "../../apiHooks/postHook";
import {
  Google,
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import ToastAlert from "../../components/ToastAlert";
let dotEnv = import.meta.env;

function SignUp() {
  const [googleLogIn, setGoogleLogIn] = useState(false);
  const [uploadState, setUploadState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [createAccountButtonState, setCreateAccountButtonState] =
    useState(true);
  const [toastInfo, setToastInfo] = useState({
    color: "",
    text: "",
  });
  const [signUpDetails, setSignUpDetails] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    photo: "",
    dept: "",
    level: "",
    matricNo: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (googleLogIn) {
      handleSignUpFormSubmit("")
      setGoogleLogIn(false)
    }
    window.scrollTo(0, 0);
  }, [googleLogIn]);

  let baseURL;
  if (dotEnv.MODE === "development") {
    baseURL = dotEnv.VITE_DEV_URL
  } else {
    baseURL = dotEnv.VITE_PROD_URL
  }

  async function handleSignUpFormChange(e) {
    let name = e.target.name;
    let file = document.getElementById(name);
    let val = e.target.value;
    if (name === "photo") {
      setUploadState(true);
      try {
        let userPhoto = new FormData();
        val = e.target.files[0];
        userPhoto.append("file", val);
        userPhoto.append("upload_preset", dotEnv.VITE_PRESET_NAME);
        userPhoto.append("cloud_name", dotEnv.VITE_CLOUD_NAME);
        let response = await fetch(dotEnv.VITE_CLOUDINARY_URL, {
          method: "POST",
          body: userPhoto,
        });

        let data = await response.json();
        // alert(data.url);
        if (data.url) {
          val = data.url;
        } else {
          val = "";
        }
      } catch (error) {
        val = "";
        console.log(error);
        // alert(error)
      }
    }
    setUploadState(false);
    file.value = "";
    setSignUpDetails({ ...signUpDetails, [name]: val });
  }

  async function handleSignUpFormSubmit(param) {
    setCreateAccountButtonState(false);
    if (param !== "") {
      param.preventDefault();
    }
    
    let url = baseURL + "/signup";
    let response = await postHook(url, signUpDetails);
    if (response.success) {
      localStorage.setItem("token", JSON.stringify(response.success));
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      setToastInfo({
        color: "green",
        text: ["Success!", "User Created Successfully"],
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
    setCreateAccountButtonState(true);
  }

  const login = useGoogleLogin({
    onSuccess: async (data) => {
      try {
        let url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${data.access_token}`
      let res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${data.access_token}`
        }
      })
      let info = await res.json()
      setSignUpDetails({...signUpDetails, email: info.email.trim(), fullName: info.family_name +" " + info.given_name, photo: info.picture, password: "intertwinedSSO" });
      setGoogleLogIn(true)
      } catch (error) {
        console.log(error)
      }
    }, 
    onError: (error) => {
      alert("error")
    }
  })


  return (
    <div className="relative">
      {toastInfo.text !== "" && (
        <ToastAlert color={toastInfo.color} text={toastInfo.text} />
      )}

      <div className="fixed -z-10 bg-orange-500 h-40 w-full">
        <div className="absolute left-0 w-full h-20 -bottom-10 rounded-full bg-orange-500"></div>
      </div>
      <div className="px-5 py-9 bg-red-40">
        <NavLink to="/" className="flex items-center gap-1 w-40">
          <div className="w-6">
            <img src={logo} />
          </div>
          <p className={`text-lg text-slate-100 varela font-bold`}>
            intertwined
          </p>
        </NavLink>

        <form
        name="signUpForm"
        id="signUpForm"
          onSubmit={(e)=>handleSignUpFormSubmit(e)}
          className="bg-slate-50 rounded-lg my-5 shadow shadow-slate-600 px-3 py-5 space-y-3"
        >
          <div className="relative p-[1px] rounded bg-orange-400 flex justify-center">
            <div className="absolute left-2 top-2 size-6">
              <img src={google_logo} />
            </div>
            <div className="w-full">
            <button type="button" onClick={()=> {alert("Sign in with Google will automatically fill in your details for you and set your login password to \"intertwinedSSO\".\n\nYou can change this password once you are logged in."); login()}} className="p-2 bg-slate-50 border w-full text-slate-600 font-medium">Sign in with Google</button>
            </div>
            
            
          </div>

          <div className="relative">
            <hr />
            <p className="absolute w-[10%] h-5 -top-2 left-[45%] bg-slate-50 text-slate-500 px-5 flex items-center justify-center">
              or
            </p>
          </div>

          <p className="font-semibold text-sm">
            Create your{" "}
            <span className="varela font-bold underline underline-offset-2 italic text-orange-400">
              intertwined
            </span>{" "}
            account
          </p>

          <div className="flex gap-3 items-center">
            <div className="relative size-12 rounded-full flex items-center justify-center overflow-hidden bg-orange-400">
              {uploadState && (
                <div className="absolute z-10 w-full h-full bg-gray-950 bg-opacity-100 flex items-center justify-center">
                  <div className="border-2 border-t-white border-b-gray-950 border-l-gray-950 border-r-gray-950 size-5 rounded-full animate-spin"></div>
                </div>
              )}
              {signUpDetails.photo === "" ? (
                <Avatar />
              ) : (
                <img
                  src={signUpDetails.photo}
                  alt="user photo"
                  className="w-full h-full"
                />
              )}
            </div>
            <div>
              <label htmlFor="photo" className="text-sm font-semibold">
                Upload a picture
              </label>
              <button
                type="button"
                className="block relative w-16 bg-orange-500 rounded text-white h-6 text-center text-sm"
              >
                Upload
                <input
                  id="photo"
                  name="photo"
                  onChange={handleSignUpFormChange}
                  type="file"
                  className="absolute top-0 left-0 w-full h-full opacity-5"
                />
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="fullName" className="text-xs font-semibold">
              Full name<span className="text-red-500 ml-1">*</span>{" "}
            </label>
            <div className="group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
              <input
                required
                id="fullName"
                name="fullName"
                
                value={signUpDetails.fullName}
                onChange={handleSignUpFormChange}
                className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="text-xs font-semibold">
              Email<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
              <input
                required
                id="email"
                name="email"
                type="email"
                value={signUpDetails.email}
                onChange={handleSignUpFormChange}
                className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
              />
            </div>
          </div>
          {/* <div>
            <label htmlFor="address" className="text-xs font-semibold">
              Location/Address<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
              <input
                
                id="address"
                name="address"
                value={signUpDetails.address}
                onChange={handleSignUpFormChange}
                className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
              />
            </div>
          </div> */}
          {/* <div>
            <label htmlFor="phone" className="text-xs font-semibold">
              Phone number<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
              <input
                
                minLength={11}
                maxLength={11}
                id="phone"
                name="phone"
                value={signUpDetails.phone}
                onChange={handleSignUpFormChange}
                className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
              />
            </div>
          </div> */}

          {/* <div>
            <p className="text-xs font-semibold">
              Are you a student of the University of Ibadan ?
            </p>
            <div className="flex gap-10">
              <div>
                <input
                  name="school"
                  type="radio"
                  checked={uite}
                  onChange={() => setUite(!uite)}
                  className="accent-orange-400"
                />
                <span className="ml-2">Yes</span>
              </div>
              <div>
                <input
                  name="school"
                  type="radio"
                  checked={!uite}
                  onChange={() => setUite(!uite)}
                  className="accent-orange-400"
                />
                <span className="ml-2">No</span>
              </div>
            </div>
          </div> */}
          {/* {uite && (
            <div className="ml-5">
              <div>
                <label htmlFor="dept" className="text-xs font-semibold">
                  Your Department / Faculty{" "}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
                  <input
                    
                    id="dept"
                    name="dept"
                    value={signUpDetails.dept}
                    onChange={handleSignUpFormChange}
                    placeholder="Department / Faculty"
                    className="placeholder:text-xs group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
                  />
                </div>
              </div>
              <div className="flex">
                <div>
                  <label htmlFor="level" className="text-xs font-semibold">
                    Your Level<span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
                    <input
                      minLength={3}
                      maxLength={3}
                    
                      id="level"
                      name="level"
                      value={signUpDetails.level}
                      onChange={handleSignUpFormChange}
                      placeholder="300"
                      className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="matricNo" className="text-xs font-semibold">
                    Your Matric No<span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
                    <input
                      minLength={6}
                      maxLength={6}
                      
                      id="matricNo"
                      name="matricNo"
                      value={signUpDetails.matricNo}
                      onChange={handleSignUpFormChange}
                      placeholder="123456"
                      className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )} */}
          <div>
            <label htmlFor="password" className="text-xs font-semibold">
              Password<span className="text-red-500 ml-1">*</span>
            </label>
            {showPassword ? (
              <div className="relative group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
                <button
                  type="button"
                  onClick={() => setShowPassword(false)}
                  className="absolute text-xs font-semibold bg-red-20 w-10 right-0 top-2"
                >
                  {/* <RemoveRedEyeOutlined sx={{ fontSize: 20 }} /> */}
                  <VisibilityOffOutlined sx={{ fontSize: 20 }} />
                </button>
                <input
                  minLength={5}
                  required
                  id="password"
                  name="password"
                  value={signUpDetails.password}
                  onChange={handleSignUpFormChange}
                  className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
                />
              </div>
            ) : (
              <div className="relative group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
                <button
                  type="button"
                  onClick={() => setShowPassword(true)}
                  className="absolute text-xs font-semibold bg-red-20 w-10 right-0 top-2"
                >
                  <RemoveRedEyeOutlined sx={{ fontSize: 20 }} />
                </button>
                <input
                  type="password"
                  minLength={5}
                  required
                  id="password"
                  name="password"
                  value={signUpDetails.password}
                  onChange={handleSignUpFormChange}
                  className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
                />
              </div>
            )}
          </div>

          <div className="my-5">
            {createAccountButtonState ? (
              <button className="bg-orange-500 active:bg-green-500 p-2 w-full text-center text-white varela rounded-md">
                Create account
              </button>
            ) : (
              <button
                disabled
                className="bg-gray-300 text-gray-300 relative p-2 w-full text-center varela rounded-md"
              >
                <div className="absolute left-[45%] border-2 border-t-black border-b-gray-950 border-l-gray-300 border-r-gray-300 size-5 rounded-full animate-spin"></div>
                Create account
              </button>
            )}
            <p className="text-black text-xs text-center my-5">
              Have an account?{" "}
              <button
                className="text-orange-500 active:text-green-500"
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
