import React, { useEffect, useRef, useState } from "react";
import RequestInfo from "./RequestInfo";
import getHook from "../../../apiHooks/getHook";
import calculateDuration from "../helper_functions/calculateDuration";
import { LocationOnOutlined } from "@mui/icons-material";
let dotEnv = import.meta.env;

function AllRequests({ user, allRequestsCache, setAllRequestsCache, setClientContent, setNavItem, theme }) {
  const [showRequestInfo, setShowRequestInfo] = useState({
    state: false,
    content: "",
  });
  const [allRequests, setAllRequests] = useState("");
  const requestsCount = useRef();

  let baseURL;
  if (dotEnv.MODE === "development") {
    baseURL = dotEnv.VITE_DEV_URL;
  } else {
    baseURL = dotEnv.VITE_PROD_URL;
  }

  useEffect(() => {
    async function getAllRequests() {
      let url = baseURL + "/get-all-requests";
      let response = await getHook(url);
      if (response.success.length >= 1) {
        response.success = response.success.reverse();
        setAllRequests(response.success);
        setAllRequestsCache(response.success);
        requestsCount.current = response.success.length;
      } else {
        setAllRequests(false);
      }
    }

    if (allRequestsCache) {
      setAllRequests(allRequestsCache);
    } else {
      getAllRequests();
    }
  }, []);
  return (
    <div className={`relative mt-14 pb-20 ${theme === "lightMode" ? "bg-slate-50" : "bg-gray-900 h-full" } `}>
      <p
        id="top"
        className={`text-lg font-bold varela p-2 border-b border-slate-300 ${theme === "lightMode" ? "text-black": "text-white" }`}
      >
        All Requests{" "}
        {allRequests.length >= 1 && <span>({allRequests.length })</span>}
      </p>
      {showRequestInfo.state && (
        <div
          onClick={() =>
            setShowRequestInfo({ ...showRequestInfo, state: false })
          }
          className={`fixed z-20 h-full w-full top-14 rounded-t-xl fadeInDown ${theme === "lightMode" ? "bg-slate-800" : "bg-white"}`}
        >
          <div className={`h-2 w-40 mx-auto rounded-full my-2 ${theme === "lightMode" ? "bg-slate-50" : "bg-gray-800"}`}></div>
          <RequestInfo
            user={user}
            content={showRequestInfo.content}
            calculateDuration={calculateDuration}
            setClientContent={setClientContent}
            setNavItem={setNavItem}
            theme={theme}
          />
        </div>
      )}
      <div className=" border-b border-slate-200 my-1 p-5">
        <input className="w-full ring-red-600 outline-red-700 border-slate-400 border rounded-full px-3 py-1" />
      </div>
      <p className="text-xs text-slate-400 px-5 py-2">
        Browse through here to see if there are any requests you could help with
        or requests that match your preference
      </p>

      {(allRequests === "" && allRequestsCache === "" ) && (
        <div className="mt-10 p-5">
          <p className="text-lg text-blue-700 font-bold mb-5">
            ... Fetching All Requests
          </p>
          <div className="relative h-1 w-full rounded-full bg-slate-300 overflow-hidden">
            <div className="progress left-right  h-full rounded-full w-full bg-pink-600"></div>
          </div>
        </div>
      )}

      {allRequests &&
        allRequests.map((items) => {
          return (
            <div key={items.requestTitle} className="relative">
              {calculateDuration(items.expiresOn, false) === "active" ? (
                <div
                  key={items}
                  onClick={() => {
                    setShowRequestInfo({ content: items, state: true });
                  }}
                  className={` mx-2 my-5 rounded-lg p-3 ${theme === "lightMode" ? "bg-white border border-slate-50 shadow" : "bg-gray-800 border border-gray-600 shadow-sm shadow-slate-600"}`}
                >
                  <p className="text-[11px] text-red-500">
                    {user.email === items.reqShaker && (
                      <span>"You made this request"</span>
                    )}
                  </p>

                  <p className={`text-[11px] ${theme === "lightMode" ? "text-slate-400" : "text-slate-400"}`}>
                    Posted {calculateDuration(items.createdAt)}
                  </p>
                  <p className={`capitaliz text-sm  ${theme === "lightMode" ? "text-black" : "text-slate-100"}`}>
                    {items.requestTitle}{" "}
                  </p>
                  <div className="text-slate-50 text-[10px] my-2 absolute top-2 right-4">
                    {items.charges === "" ? (
                      <span className="px-1 py-1 text-ce bg-blue-400 rounded">
                        Free Service
                      </span>
                    ) : (
                      <span className="px-1 py-1 text-ce bg-green-400 rounded">
                        Paid Service
                      </span>
                    )}
                  </div>
                  <div className={`relative text-sm font-light bg-red-30 h-10 overflow-hidden  ${theme === "lightMode" ? "text-slate-500" : "text-slate-300"} `}>
                    <p className={`absolute bottom-0 right-0 px-1  ${theme === "lightMode" ? "bg-slate-50": "bg-gray-800"}`}>
                      ...
                    </p>
                    {items.requestDescription}
                  </div>
                  <div className="flex justify-between items-center flex-row-reverse">
                  <div className={`flex items-center text-sm -ml-1 my-1  ${theme === "lightMode" ? "text-black" : "text-slate-100"}`}>
                    <LocationOnOutlined sx={{ fontSize: 20 }} />
                    <p>{items.landmark} </p>
                  </div>
                  <div className={`text-sm flex gap-2  ${theme === "lightMode" ? "text-black" : "text-slate-100"}`}>
                    Request status:{" "}
                    <div>
                      {calculateDuration(items.expiresOn, false) ===
                      "active" ? (
                        <p className="text-green-500 font-semibold">Active</p>
                      ) : (
                        <p className="text-red-500 font-semibold">Expired</p>
                      )}
                    </div>
                  </div>
                  </div>
                 
                </div>
              ) : (
                <div
                  key={items}
                  className="relative bg-slate-50 border border-red-40 bg-opacity- mx-2 my-5 rounded-lg p-3 space-y-"
                >
                  <div className={`absolute z-1 rounded-lg top-0 left-0 w-full h-full   ${theme === "lightMode" ? "bg-red-500 bg-opacity-15" : "bg-gray-600 bg-opacity-80"}`}></div>
                  <p className="text-[11px] text-slate-300">
                    Posted {calculateDuration(items.createdAt)}
                  </p>
                  <p className="capitaliz text-sm text-slate-300">
                    {items.requestTitle}{" "}
                  </p>
                  <div className="text-slate-50 text-[10px] my-2 absolute top-2 right-4">
                    {items.charges === "" ? (
                      <span className="px-1 py-1 text-ce bg-blue-50 bg-opacity-40 rounded">
                        Free Service
                      </span>
                    ) : (
                      <span className="px-1 py-1 text-ce bg-green-50 bg-opacity-40 rounded">
                        Paid Service
                      </span>
                    )}
                  </div>
                  <div className="relative text-sm text-slate-300 font-light bg-red-30 h-10 overflow-hidden ">
                    <p className="absolute bg-red-100 bg-opacity-15 bottom-0 right-0 px-1">
                      ...
                    </p>
                    {items.requestDescription}
                  </div>
                  <div className="flex justify-between items-center flex-row-reverse">
                  <div className="flex items-center text-sm -ml-1 my-1 text-slate-200">
                    <LocationOnOutlined sx={{ fontSize: 20 }} />
                    <p>{items.landmark} </p>
                  </div>
                  <div className="text-sm text-slate-500 flex gap-2">
                    Request status:{" "}
                    <div>
                      {calculateDuration(items.expiresOn, false) ===
                      "active" ? (
                        <p className="text-green-500 font-semibold">Active</p>
                      ) : (
                        <p className="text-red-500 font-semibold">Expired</p>
                      )}
                    </div>
                  </div>
                  </div>
                 
                </div>
              )}
            </div>
          );
        })}

      {allRequests === false && (
        <div className="p-5 text-xl font-bold text-red-700">
          <p>No requests yet</p>
        </div>
      )}
    </div>
  );
}

export default AllRequests;
