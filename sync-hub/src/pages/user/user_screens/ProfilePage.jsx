import {
  ArrowBack,
  CancelOutlined,
  CreateOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import postHook from "../../../apiHooks/postHook";
import putHook from "../../../apiHooks/putHook";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import ToastAlert from "../../../components/ToastAlert";
import EditUserPhoto from "../../../components/EditUserPhoto";
import EditUserFullName from "../../../components/EditUserFullName";
import EditUserAddress from "../../../components/EditUserAddress";
let dotEnv = import.meta.env;

function ProfilePage({ user, setUser, theme }) {
  const [uite, setUite] = useState(false)
  const [changeDetails, setChangeDetails] = useState("");
  const [changeImageState, setChangeImageState] = useState(false);
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);
  const [deleteAccountState, setDeleteAccountState] = useState(false);
  const [toastInfo, setToastInfo] = useState({
    color: "",
    text: "",
  });
  const [userName, setUserName] = useState({
    firstName: "",
    lastName: "",
  });

  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/user/home");
    } else {
      let names = user.fullName.split(" ");
      try {
        setUserName({ firstName: names[0], lastName: names[1] });
      } catch (error) {
        setUserName({ firstName: names[0], lastName: "" });
      }
    }
  }, []);

  let baseURL;
  if (dotEnv.MODE === "development") {
    baseURL = dotEnv.VITE_DEV_URL;
  } else {
    baseURL = dotEnv.VITE_PROD_URL;
  }

  async function handleUserDetailsEdit(e) {
    setChangeImageState(true);
    let name = e.target.name;
    let file = document.getElementById(name);
    let val = e.target.value;
    if (name === "photo") {
      setChangeImageState(true);
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
        if (data.url) {
          val = data.url;
          let url = baseURL + "/change-user-details";
          let response = await putHook(url, {
            email: user.email,
            photo: val,
            tag: "photo",
          });
          if (response.success) {
            setUser(response.success);
            setChangeImageState(false);
          } else {
            alert("Profile Photo Change Failed");
          }
        } else {
          val = "";
        }
      } catch (error) {
        val = "";
        console.log(error);
      }
    }
  }

  async function deleteAccount() {
    setConfirmDeleteAccount(false);
    setDeleteAccountState(true);
    let url = baseURL + "/user/delete-account";
    let response = await putHook(url, { email: user.email });
    if (response.success) {
      setDeleteAccountState(false);
      localStorage.removeItem("token");
      setUser("");
      setToastInfo({
        color: "green",
        text: ["Success!", response.success],
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else if (response.warning) {
      setToastInfo({ color: "blue", text: ["Warning!", response.warning] });
    } else {
      setToastInfo({ color: "red", text: ["Error!", response.error] });
    }
    setTimeout(() => {
      setToastInfo({ color: "", text: "" });
    }, 3000);
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`relative ${
        theme === "lightMode" ? "bg-white" : "bg-gray-900"
      } fixed z-50 w-full h-dvh overflow-hidden`}
    >
      {toastInfo.text !== "" && (
        <ToastAlert color={toastInfo.color} text={toastInfo.text} />
      )}

      {confirmDeleteAccount && (
        <div
          onClick={() => setConfirmDeleteAccount(false)}
          className="absolute z-10 w-full h-full bg-gray-900 bg-opacity-80 flex pt-[50%] justify-center"
        >
          <div className="w-[80%] rounded-md bg-slate-100 h-52 p-5">
            <div className="w-20 mx-auto flex items-center justify-center text-red-500 bg-red-40">
              <CancelOutlined sx={{ fontSize: 60 }} />
            </div>
            <p className="text-center text-xl font-medium varela">
              Are you sure ?
            </p>
            <p className="text-slate-500 text-center text-xs">
              Do you really want to delete this account? This process cannot be
              undone.{" "}
            </p>
            <div className="flex items-center justify-evenly my-5">
              <div
                onClick={() => setConfirmDeleteAccount(false)}
                className="w-[30%]"
              >
                <button className="text-center w-full p-1 bg-slate-400 active:bg-slate-700 rounded-sm text-white">
                  No
                </button>
              </div>
              <div className="w-[30%]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteAccount();
                  }}
                  className="text-center w-full p-1 bg-red-500 active:bg-red-700 rounded-sm text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteAccountState && (
        <div
          onClick={() => setConfirmDeleteAccount(false)}
          className="absolute z-10 w-full h-full bg-gray-900 bg-opacity-80 flex items-center flex-col justify-center"
        >
          <p className="text-red-600 font-medium my-5">... Deleting Account</p>
          <div className="relative size-10 rounded-full bg-slate-700">
            <div className="absolute size-10 rounded-full border-2 border-t-slate-100  border-x-slate-700 border-b-slate-700 animate-spin"></div>
          </div>
        </div>
      )}

      {changeDetails && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setChangeDetails("");
          }}
          className="absolute h-full w-full bg-slate-950 bg-opacity-70 z-10"
        ></div>
      )}
      {changeDetails !== "" && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setChangeDetails("");
          }}
          className="absolute bg-slate-50 w-full bottom-0 z-20 rounded-t-3xl fadeInDown"
        >
          {changeDetails === "photo" && (
            <EditUserPhoto
              user={user}
              changeImageState={changeImageState}
              handleUserDetailsEdit={handleUserDetailsEdit}
            />
          )}
          {changeDetails === "fullName" && (
            <EditUserFullName user={user} setUser={setUser} />
          )}
          {changeDetails === "address" && (
            <EditUserAddress user={user} setUser={setUser} />
          )}
        </div>
      )}
      <div
        className={`relative flex items-center justify-center py-5 border-slate-300 ${
          !(theme === "lightMode") && "text-white"
        }`}
      >
        <div
          onClick={() => navigate("/user/all-requests")}
          className="absolute w-full left-5"
        >
          <ArrowBack />
        </div>
        <p id="top" className="text-lg font-bold varela">
          Profile
        </p>
      </div>

      <div
        className={`p-2 border-y ${
          theme === "lightMode" ? " border-slate-30" : "border-slate-500"
        } border-slate-30 flex justify-start`}
      >
        <div className="w-[30%] flex items-center justify-center bg-red-20">
          <div className="size-20 rounded-full relative bg-gray-200 flex items-center justify-center ">
            <div className="absolute top-0 left-0 p-1 size-5 rounded-full bg-white">
              <div className="w-full h-full rounded-full bg-green-600"></div>
            </div>
            {/* pen */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setChangeDetails("photo");
              }}
              className="absolute size-7 bottom-0 right-0 rounded-full p-[2px] bg-green-600"
            >
              <div className=" w-full h-full rounded-full bg-white">
                <div className="flex items-center justify-center w-full h-full pl-[1px pt-[1px">
                  <CreateOutlined sx={{ fontSize: 15, color: green[800] }} />
                </div>
              </div>
            </div>
            {user.photo ? (
              <img
                src={user.photo}
                className={`w-full h-full object-cover rounded-full ${
                  !(theme === "lightMode") && "border-2 border-slate-100"
                }`}
              />
            ) : (
              <Avatar />
            )}
          </div>
        </div>

        <div
          className={`space-y-1 bg-red-40 w-[60%] ${
            !(theme === "lightMode") && "text-slate-100"
          }`}
        >
          {userName.firstName && (
            <div className="flex items-center bg-red-40 gap-5">
              <p className=" bg-red-20 font-semibold text-lg">
                {userName.firstName[0].toUpperCase() +
                  userName.firstName.slice(1) +
                  " " +
                  userName.lastName[0].toUpperCase()}
                .
              </p>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setChangeDetails("fullName");
                }}
                className="size-6 rounded-full bg-green-600 flex items-center justify-center"
              >
                <div className="size-5 rounded-full bg-white">
                  <div className="flex items-center justify-center w-full h-full pl-[1px pt-[1px">
                    <CreateOutlined sx={{ fontSize: 15, color: green[800] }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center">
            <div className="bg-red-70 text-sm text-slate-600">
              <LocationOnOutlined sx={{ fontSize: 20 }} />
            </div>
            <p className="text-sm">{user.address || "---"} </p>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setChangeDetails("address");
              }}
              className="ml-5 size-6 rounded-full bg-green-600 flex items-center justify-center"
            >
              <div className="size-5 rounded-full bg-white">
                <div className="flex items-center justify-center w-full h-full pl-[1px pt-[1px">
                  <CreateOutlined sx={{ fontSize: 15, color: green[800] }} />
                </div>
              </div>
            </div>
          </div>
          <p className="bg-red-20 text-slate-500">{user.email}</p>
        </div>
      </div>

      <div className="p-5">
        <p className="varela font-semibold text-lg">Other Details</p>
        <div>
                    <div>
            <p className="text-sm font-semibold">
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
          </div>
        </div>
      </div>

       {uite && (
            <div className="p-5 -mt-5 bg-red-40">
              <div>
                <label htmlFor="dept" className="text-xs font-semibold">
                  Your Department / Faculty{" "}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
                  <input
                    
                    id="dept"
                    name="dept"
                    // value={signUpDetails.dept}
                    // onChange={handleSignUpFormChange}
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
                      // value={signUpDetails.level}
                      // onChange={handleSignUpFormChange}
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
                      // value={signUpDetails.matricNo}
                      // onChange={handleSignUpFormChange}
                      placeholder="123456"
                      className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

      <div className="m-2">
        <button
          onClick={() => setConfirmDeleteAccount(true)}
          className={`p-1 w-full rounded-md border h-10 ${
            theme === "lightMode"
              ? "bg-white border-red-400 text-red-500"
              : "bg-gray-700 border-gray-900 text-red-500"
          }  varela  hover:bg-red-500 hover:text-white`}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
