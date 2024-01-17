import { ArrowBack, ModeComment, Wallpaper } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg_whatsapp_image from "../../images/bg_whatsapp.jpg";
import putHook from "../../../apiHooks/putHook";
import LoadingSpinner from "../../../components/LoadingSpinner";
let dotEnv = import.meta.env;

function SettingsPage({ theme, user, setUser }) {
  const [settings, setSettings] = useState("");
  const [changeChatWallPaperState, setChangeChatWallPaperState] =
    useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    let title = document.querySelector("title");
    title.innerHTML = "intertwined | Settings";
    if (!user) {
      navigate("/user/home");
    }
  }, []);

  let baseURL;
  if (dotEnv.MODE === "development") {
    baseURL = dotEnv.VITE_DEV_URL;
  } else {
    baseURL = dotEnv.VITE_PROD_URL;
  }

  async function handleChatWallPaperChange(e) {
    let val;
    setChangeChatWallPaperState(true);
    try {
      let chatWallPaper = new FormData();
      val = e.target.files[0];
      chatWallPaper.append("file", val);
      chatWallPaper.append("upload_preset", dotEnv.VITE_PRESET_NAME);
      chatWallPaper.append("cloud_name", dotEnv.VITE_CLOUD_NAME);
      let response = await fetch(dotEnv.VITE_CLOUDINARY_URL, {
        method: "POST",
        body: chatWallPaper,
      });

      let data = await response.json();
      // alert(data.url);
      if (data.url) {
        val = data.url;
        let url = baseURL + "/change-user-details";
        let response = await putHook(url, {
          email: user.email,
          chatWallPaper: val,
          tag: "chatWallPaper",
        });
        if (response.success) {
          setUser(response.success);
          setChangeChatWallPaperState(false);
        } else {
          alert("Chat Wallpaper Change Failed");
        }
      } else {
        val = "";
      }
    } catch (error) {
      val = "";
      console.log(error);
      setChangeChatWallPaperState(false);
      // alert(error)
    }
    // }
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
      {settings !== "" && (
        <div className="absolute z-20 bottom-0 top-0 w-full fadeInDown bg-white">
          <div
            className={`relative flex items-center justify-center py-5 border-slate-300 ${
              !(theme === "lightMode") && "text-white"
            }`}
          >
            <div
              onClick={() => setSettings("")}
              className="absolute w-full left-5"
            >
              <ArrowBack />
            </div>
            <p id="top" className="text-lg font-bold varela">
              Change Chat Wallpaper
            </p>
          </div>
          <div>
            <div className="relative w-2/3 h-96 mx-auto bg-red-30 rounded-md">
              <div className="absolute w-full h-full">
                <img
                  src={user.chatWallPaper || bg_whatsapp_image}
                  className="w-full h-full object-cover rounded-md border border-black"
                />
              </div>
              <div className="flex justify-end px-5">
                <div className="relative z-10 max-w-[80%] ">
                  <div className="absolute size-5 bottom-0 -right-2 bg-lime-200 -z-10 triangle-right"></div>
                  <p className="p-2 rounded bg-lime-200 text-sm w-20 h-5 mt-10 "></p>
                </div>
              </div>
              <div className="flex justify-start px-5">
                <div className="relative z-10 max-w-[80%] ">
                  <div className="absolute size-5 bottom-0 -left-2 bg-slate-50 -z-10 triangle-left"></div>
                  <p className="p-2 rounded bg-slate-50 text-sm w-20 h-5 "></p>
                </div>
              </div>
            </div>
            {!changeChatWallPaperState ? (
              <div className="relative w-20 mx-auto flex items-center justify-center my-5 bg-red-30 overflow-hidden">
                <div className="absolute w-full h-full opacity-0 ">
                  <input
                    name="chatWallPaper"
                    id="chatWallPaper"
                    onChange={handleChatWallPaperChange}
                    type="file"
                  />
                </div>
                <button className="text-center text-green-500">Change</button>
              </div>
            ) : (
              <div className="flex my-5 items-center justify-center">
                <LoadingSpinner />
              </div>
            )}
            
          </div>
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
          Settings
        </p>
      </div>
      <div
        className={`p-5 border-t ${
          theme === "lightMode" ? " border-slate-30" : "border-slate-500 text-slate-100"
        } border-slate-30 space-y-5`}
      >
        <div onClick={() => setSettings("wallPaper")} className="flex gap-4">
          <div>
            <Wallpaper />
          </div>
          <p>Chat wallpaper</p>
        </div>

        <div className="flex gap-4">
          <div>
            <ModeComment />
          </div>
          <p>Chat bubble color</p>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
