import React, { useEffect, useRef, useState } from "react";
import RequestInfo from "./RequestInfo";
import getHook from "../../../apiHooks/getHook";
import calculateDuration from "../helper_functions/calculateDuration";
import { LocationOnOutlined, Tune } from "@mui/icons-material";
import ConcentricCircles from "../../../components/ConcentricCircles";
let dotEnv = import.meta.env;

function AllRequests({
  user,
  allRequestsCache,
  setAllRequestsCache,
  setClientContent,
  setNavItem,
  theme,
}) {
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
    let title = document.querySelector("title");
    title.innerHTML = "intertwined | All Requests";
    setClientContent("");
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

  function handleRequestSearch(e) {
    let val = e.target.value
    if (val.length < 1 ) {
      setAllRequests(allRequestsCache);
    } else {
      let requestFilter = allRequestsCache.filter(items => items.requestTitle.toLowerCase().includes(val.toLowerCase()))
      setAllRequests(requestFilter)
    }

  }
  return (
    <div
      className={`relative h-screen z-10 pt-14 pb-20 lg:pl-40 overflow-scroll ${
        theme === "lightMode"
          ? "bg-gradient-to-br from-purple-800 to-blue-600 h-screen"
          : "bg-gray-900 h-screen"
      } `}
    >
     <ConcentricCircles theme={theme} />
      <div
        id="top"
        className={`text-lg font-bold varela p-2 border-slate-300 ${
          theme === "lightMode" ? "text-slate-100" : "text-white"
        }`}
      >
        All Requests{" "}
        {allRequests.length >= 1 && <span>({allRequests.length})</span>}
        <p className={`font-light text-xs text-slate-300`}>( All requests made will appear here, including yours ) </p>
      </div>
      {showRequestInfo.state && (
        <div
          onClick={() =>
            setShowRequestInfo({ ...showRequestInfo, state: false })
          }
          className={`fixed z-20 h-full w-full lg:w-1/3 overflow-auto lg:left-1/3 top-14 rounded-t-xl fadeInDown ${
            theme === "lightMode" ? "bg-slate-800" : "bg-white"
          }`}
        >
          <div
            className={`h-2 w-40 mx-auto rounded-full my-2 ${
              theme === "lightMode" ? "bg-slate-50" : "bg-gray-800"
            }`}
          ></div>
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

      <div className="flex justify-between border-b border-slate-400 my-1 px-5 py-3">
        <div className="w-[80%]  ">
          <input
          disabled={!allRequests}
          name="search"
          onChange={handleRequestSearch}
            placeholder="Search Requests"
            className={`w-full bg-slate-200 bg-opacity-20  disabled:bg-opacity-50  ring-slate-600 h-10 outline-slate-700 border-slate-400 border rounded-md px-3 py-1 ${
              theme === "lightMode" ? "text-white disabled:text-slate-900" : "text-slate-50"
            }`}
          />
        </div>
        <div className="w-[15%]">
          <button className="h-10 bg-slate-200 bg-opacity-20 w-full text-slate-200 rounded-md">
            <Tune />
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-300 px-5 py-2 varela">
        Browse through here to see if there are any requests you could help with
        or requests that match your preference to assist with.
      </p>

      {allRequests === "" && allRequestsCache === "" && (
        <div className="mt-10 p-5 h-screen">
          <p className="text-lg text-slate-200 font-bold mb-5">
            ... Fetching All Requests
          </p>
          <div className="relative h-1 w-full rounded-full bg-slate-300 overflow-hidden">
            <div className="progress left-right  h-full rounded-full w-full bg-pink-600"></div>
          </div>
        </div>
      )}

<div className="">
      {allRequests &&
        allRequests.map((items) => {
          return (
            <div key={items.requestTitle} className="relative lg:w-1/2">
              {calculateDuration(items.expiresOn, false) === "active" ? (
                <button
                  key={items}
                  onClick={() => {
                    setShowRequestInfo({ content: items, state: true });
                  }}
                  className={` mx-2 my-5 rounded-lg p-3 text-left ${
                    theme === "lightMode"
                      ? "bg-purple-50 border border-slate-100 shadow"
                      : "bg-gray-800 border border-gray-600 shadow-sm shadow-slate-600"
                  }`}
                >
                  <p className="text-[11px] text-red-500">
                    {user.email === items.reqShaker && (
                      <span>"You made this request"</span>
                    )}
                  </p>

                  <p
                    className={`text-[11px] ${
                      theme === "lightMode"
                        ? "text-slate-400"
                        : "text-slate-400"
                    }`}
                  >
                    Posted {calculateDuration(items.createdAt)}
                  </p>
                  <p
                    className={`text-sm  ${
                      theme === "lightMode" ? "text-black" : "text-slate-100"
                    }`}
                  >
                    {items.requestTitle}{" "}
                  </p>
                  <div className="text-slate-50 text-[10px] my-2 absolute top-6 right-4">
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
                  <div
                    className={`relative text-sm font-light bg-red-30 h-10 overflow-hidden  ${
                      theme === "lightMode"
                        ? "text-slate-500"
                        : "text-slate-300"
                    } `}
                  >
                    <p
                      className={`absolute bottom-0 right-0 px-1  ${
                        theme === "lightMode" ? "bg-slate-50" : "bg-gray-800"
                      }`}
                    >
                      ...
                    </p>
                    {items.requestDescription}
                  </div>
                  <div className="flex justify-between items-center flex-row-reverse">
                    <div
                      className={`flex items-center text-xs -ml-1 my-1  ${
                        theme === "lightMode" ? "text-black" : "text-slate-100"
                      }`}
                    >
                      <LocationOnOutlined sx={{ fontSize: 20 }} />
                      <p>{items.landmark} </p>
                    </div>
                    <div
                      className={`text-xs flex gap-2  ${
                        theme === "lightMode" ? "text-black" : "text-slate-100"
                      }`}
                    >
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
                </button>
              ) : (
                <button
                  key={items}
                  className="relative bg-slate-50 border border-red-40 bg-opacity- mx-2 my-5 rounded-lg p-3 space-y-"
                >
                  <div
                    className={`absolute z-1 rounded-lg top-0 left-0 w-full h-full   ${
                      theme === "lightMode"
                        ? "bg-gray-500 bg-opacity-80"
                        : "bg-gray-600 bg-opacity-80"
                    }`}
                  ></div>
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
                </button>
              )}
            </div>
          );
        })}

</div>

      {allRequests === false && (
        <div className={`p-5 text-xl font-bold ${theme === "lightMode" ? "text-purple-300" : "text-slate-300" }`}>
          <p>NO REQUESTS YET</p>
        </div>
      )}
    </div>
  );
}

export default AllRequests;
