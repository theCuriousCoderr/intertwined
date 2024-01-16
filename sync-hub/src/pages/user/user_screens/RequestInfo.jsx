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
      className={`relative rounded-t-xl h-full overflow-hidden  ${
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
            <p>Name: {clientDetails.fullName}</p>
            <p>Email: <span className="text-xs">{clientDetails.email}</span></p>
            <p>Phone: {clientDetails.phone}</p>
            <p>Verified Status: Unverified</p>
            <p>Student of UI: No</p>
          </div>
        </>
      )}
      <div className="p-5 bg-red-30">
        <div className="py-5 border-b">
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

        <div className="py-5 border-b">
          <p className="text-slate-500 text-sm">
            {content.requestDescription}{" "}
          </p>
        </div>

        <div className="text-slate-50 text-xs my-2 py-5 border-b space-y-2">
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
            <p className="bg-red-30 text-slate-700 text-base">
              {content.charges} Naira
            </p>
          )}
        </div>

        <div className="py-5 border-b">
          <p className="text-slate-500 text-sm">
            Request is valid and available until:{" "}
          </p>
          <p className="text-base text-slate-700">
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
          <p>About the client</p>
          <div className="">
            <p className="text-slate-500 text-sm">
              Contact: <span className="text-slate-800">{content.phone}</span>
            </p>
            <p className="text-sm text-slate-500">
              Location:{" "}
              <span className="text-slate-800">
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
