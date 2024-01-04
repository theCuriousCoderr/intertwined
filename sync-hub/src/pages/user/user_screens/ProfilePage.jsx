import {
  ArrowBack,
  CreateOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";
import React, { useState } from "react";
import postHook from "../../../apiHooks/postHook";
import putHook from "../../../apiHooks/putHook";
import { useNavigate } from "react-router-dom";
let dotEnv = import.meta.env;

function ProfilePage({ user, setUser, setSideNavBarExtend }) {
  const [changeDetails, setChangeDetails] = useState("");
  const [changeImageState, setChangeImageState] = useState(false);
  let firstName = user.fullName.split(" ")[0];
  let lastName = user.fullName.split(" ")[1];
  let navigate = useNavigate();
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

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={` bg-red-40 fixed w-full h-full`}
    >
      {changeDetails && (
        <div className="absolute h-full w-full bg-slate-950 bg-opacity-70 z-10"></div>
      )}
      {changeDetails !== "" && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setChangeDetails("");
          }}
          className="absolute bg-red-50 w-full bottom-0 z-20 rounded-t-3xl fadeInDown"
        >
          {changeDetails === "photo" && (
            <div className="">
              <div className="p-5">
                <p id="top" className="text-2xl font-bold varela">
                  Edit photo
                </p>
              </div>
              <div className="relative w-full rounded-full flex items-center justify-center my-5">
                {changeImageState && (
                  <div className="absolute size-48 rounded-full bg-black flex items-center justify-center">
                    <div className="size-10 border-4 border-t-slate-50 border-l-slate-800 border-r-slate-800 border-b-slate-800 animate-spin rounded-full"></div>
                  </div>
                )}
                <img
                  src={user.photo}
                  className="size-48 rounded-full object-cover"
                />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="relative mb-10 w-32 mx-auto"
              >
                <input
                  name="photo"
                  id="photo"
                  type="file"
                  onChange={handleChangeImage}
                  className="absolute w-full h-full bg-red-30 opacity-0"
                />
                <button className=" p-2 bg-green-400 active:bg-greem-700 rounde rounded-md text-slate-100">
                  Change Image
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div
        onClick={() => {
          setSideNavBarExtend("");
        }}
        className="relative flex items-center justify-center py-5 border-b border-slate-300"
      >
        <div className="absolute w-full left-5">
          <ArrowBack />
        </div>
        <p id="top" className="text-lg font-bold varela">
          Profile
        </p>
      </div>

      <div className="p-2 border-b border-slate-30 flex justify-start gap-">
        <div className="w-[30%] flex items-center justify-center bg-red-20">
          <div className="size-20 rounded-full relative bg-red-70">
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
            <img
              src={user.photo}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        <div className="space-y-1 bg-red-40 w-[60%]">
          <p className=" bg-red-20 font-semibold text-lg">
            {firstName + " " + lastName[0]}.
          </p>
          <div className="flex items-start">
            <div className="bg-red-70 text-sm text-slate-600">
              <LocationOnOutlined sx={{ fontSize: 20 }} />
            </div>
            <p className="text-sm">{user.address} </p>
          </div>
          <p className="bg-red-20 text-slate-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
