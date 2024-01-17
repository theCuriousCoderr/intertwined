import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import postHook from "../../../apiHooks/postHook";
import { Avatar } from "@mui/material";
let dotEnv = import.meta.env;

function RequestInfo({
  user,
  content,
  calculateDuration,
  setClientContent,
  setNavItem,
  theme,
}) {
  const [clientDetails, setClientDetails] = useState("");
  const [showClientDetails, setShowClientDetails] = useState(false);

  let baseURL;
  if (dotEnv.MODE === "development") {
    baseURL = dotEnv.VITE_DEV_URL;
  } else {
    baseURL = dotEnv.VITE_PROD_URL;
  }
  useEffect(() => {
    async function getClientDetails() {
      let url = baseURL + "/get-user";
      let response = await postHook(url, { email: content.reqShaker });
      if (response.success) {
        setClientDetails(response.success);
      } else {
        setClientDetails("");
      }
    }
    getClientDetails();
  }, []);

  // alert(new Date().toISOString() )

  let navigate = useNavigate();
  return (
    <div
    onScroll={(e)=> e.stopPropagation()}
      className={`relative rounded-t-xl h-full overflow-scroll  ${
        theme === "lightMode" ? "bg-white" : "bg-gray-900"
      }`}
    >
      {(showClientDetails && clientDetails) && (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowClientDetails(false);
            }}
            className="absolute z-10 h-full w-full bg-gray-900 opacity-70"
          ></div>
          <div className="absolute z-10 w-[80%] left-[10%] bg-white mt-20 p-2 rounded-md">
            <p className="varela font-semibold p-1 border-b border-slate-500 ">
              * About the client
            </p>
            <div className="size-20 mx-auto my-5 rounded-full flex items-center justify-center bg-slate-200 overflow-hidden">
              {clientDetails.photo ? (
                <img
                  src={clientDetails.photo}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Avatar />
              )}
            </div>
            <p className="font-bold">Name: <span className="font-normal">{clientDetails.fullName}</span> </p>
            <p className="font-bold">Email: <span className="font-normal">{clientDetails.email}</span> </p>
            <p className="font-bold">Phone: <span className="font-normal">{clientDetails.phone}</span> </p>
            <p className="font-bold">Verified Status: <span className="font-normal">Unverified </span> </p>
            <p className="font-bold">Student of UI: <span className="font-normal">No</span> </p>
          </div>
        </>
      )}
      <div className="p-5 bg-red-30">
        <div className="py-5">
          <p
            className={`varela text-sm ${
              theme === "lightMode" ? "text-black" : "text-white"
            }`}
          >
            {content.requestTitle}
          </p>
          <p className="text-slate-400 text-xs">
            Posted {calculateDuration(content.createdAt)}
          </p>
        </div>

        <div className={`py-5 border-y ${theme === "lightMode" ? "border-slate-500" : "border-slate-700"}`}>
          <p className={` text-sm ${theme === "lightMode" ? "text-slate-950" : "text-slate-200"}`}>
            {content.requestDescription}{" "}
          </p>
        </div>

        <div className="text-slate-50 text-xs my-2 py-5 space-y-2">
          {content.charges === "" ? (
            <span className="px-1 py-1 text-ce bg-blue-500 rounded">
              Free Service
            </span>
          ) : (
            <span className="px-1 py-1 text-ce bg-green-500 rounded">
              Paid Service
            </span>
          )}
          {content.charges && (
            <p className={`bg-red-30 text-base ${theme === "lightMode" ? "text-slate-950" : "text-slate-200"}`}>
              {content.charges} Naira
            </p>
          )}
        </div>

        <div className={`py-5 border-y ${theme === "lightMode" ? "border-slate-500" : "border-slate-700"} `}>
          <p className={` text-s ${theme === "lightMode" ? "text-slate-500" : "text-slate-400"}`}>
            Request is valid and available until:{" "}
          </p>
          <p className={`text-base ${theme === "lightMode" ? "text-black" : "text-slate-200"}`}>
            {content.expiresOn.slice(0, 10).split("-").reverse().join("-")}{" "}
          </p>
        </div>

        <div className="relative py-5 border- space-y-1 text-base">
          <div className="absolute right-0">
            <button
            disabled={!clientDetails}
              onClick={(e) => {
                e.stopPropagation();
                setShowClientDetails(true);
              }}
              className="p-1 bg-blue-700 text-xs text-white rounded disabled:bg-slate-400 disabled:text-slate-500"
            >
              {!clientDetails ? "---" : "More Info" }
            </button>
          </div>
          <p className={`text- ${theme === "lightMode" ? "text-slate-500" : "text-slate-400"}`}>About the client</p>
          <div className="">
            <p className="text-slate-500 text-sm">
              Contact: <span className={` ${theme === "lightMode" ? "text-black" : "text-slate-200"}`}>{content.phone}</span>
            </p>
            <p className="text-sm text-slate-500">
              Location:{" "}
              <span className={`${theme === "lightMode" ? "text-black" : "text-slate-200"}`}>
                {content.landmark}, {content.city}, {content.country}
              </span>{" "}
            </p>
          </div>
        </div>

        <div className="my-3">
          {user.email === content.reqShaker && (
            <p className="text-red-600 font-bold text-center">
              You made this request
            </p>
          )}
          {user.email === content.reqShaker ? (
            <button
              onClick={(e) => e.stopPropagation()}
              className="w-full h-10 text-center bg-green-200 text-white varela p-1 rounded-md"
            >
              Message Client Now
            </button>
          ) : (
            <button
              onClick={() => {
                setClientContent(content);
                navigate("/user/messages");
              }}
              className="w-full h-10 text-center bg-green-600 active:bg-green-500 text-white varela p-1 rounded-md"
            >
              Message Client Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestInfo;
