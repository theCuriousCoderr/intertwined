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
let dotEnv = import.meta.env;

function ProfilePage({ user, setUser, theme }) {
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

  let navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/user/home")
    }
    let names = user.fullName.split(" ");
    setUserName({ firstName: names[0], lastName: names[1] });
  }, []);


  let baseURL;
  if (dotEnv.MODE === "development") {
    baseURL = dotEnv.VITE_DEV_URL;
  } else {
    baseURL = dotEnv.VITE_PROD_URL;
  }

  async function handleChangeImage(e) {
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
        // alert(data.url);
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
        // alert(error)
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
      } fixed z-50 w-full h-dvh`}
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
              <CancelOutlined sx={{fontSize: 60}} />
              </div>
              <p className="text-center text-xl font-medium varela">Are you sure ?</p>
            <p className="text-slate-500 text-center text-xs">
              Do you really want to delete this account? This process cannot be undone.{" "}
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
            <div className="">
              <div className="p-5">
                <p id="top" className="text-2xl font-bold varela">
                  Edit photo
                </p>
              </div>
              <div className="relative bg-gray-20 w-full rounded-full flex items-center justify-center my-5">
                {changeImageState && (
                  <div className="absolute size-48 rounded-full bg-black flex items-center justify-center">
                    <div className="size-10 border-4 border-t-slate-50 border-l-slate-800 border-r-slate-800 border-b-slate-800 animate-spin rounded-full"></div>
                  </div>
                )}
                {user.photo ? (
                  <img
                    src={user.photo}
                    className="size-48 rounded-full object-cover"
                  />
                ) : (
                  <Avatar />
                )}
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="relative mb-10 w-32 mx-auto bg-red-50"
              >
                <input
                  name="photo"
                  id="photo"
                  type="file"
                  onChange={handleChangeImage}
                  className="absolute w-full h-full bg-red-30 opacity-0"
                />
                <button className="w-full p-2 bg-green-400 active:bg-green-700 rounde rounded-md text-slate-100">
                  Change Image
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div
        className={`relative flex items-center justify-center py-5 border-slate-300 ${
          !(theme === "lightMode") && "text-white"
        }`}
      >
        <div onClick={() => navigate(-1)} className="absolute w-full left-5">
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
          {userName.firstName && <p className=" bg-red-20 font-semibold text-lg">
            {userName.firstName[0].toUpperCase() +
              userName.firstName.slice(1) +
              " " +
              userName.lastName[0].toUpperCase()}
            .
          </p>}
          <div className="flex items-start">
            <div className="bg-red-70 text-sm text-slate-600">
              <LocationOnOutlined sx={{ fontSize: 20 }} />
            </div>
            <p className="text-sm">{user.address || "---"} </p>
          </div>
          <p className="bg-red-20 text-slate-500">{user.email}</p>
        </div>
      </div>
      <div className="m-2">
        <button
          onClick={() => setConfirmDeleteAccount(true)}
          className={`p-1 w-full rounded-md border ${
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
