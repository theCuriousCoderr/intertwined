import React, { useEffect, useRef, useState } from "react";
import RequestInfo from "./RequestInfo";
import getHook from "../../../apiHooks/getHook";
import calculateDuration from "../helper_functions/calculateDuration";
import { LocationOnOutlined } from "@mui/icons-material";
let dotEnv = import.meta.env;

function AllRequests({user, setClientContent, setNavItem}) {
  const [showRequestInfo, setShowRequestInfo] = useState({
    state: false,
    content: ""
  });
  const [allRequests, setAllRequests] = useState("");
  const requestsCount = useRef()

  useEffect(() => {
    async function getAllRequests() {
      // alert(5)
      let url = dotEnv.VITE_DEV_URL + "/get-all-requests";
      let response = await getHook(url);
      if (response.success) {
        // alert(JSON.stringify(response.success))
        // alert(1)
        response.success = response.success.reverse()
        setAllRequests(response.success);
        requestsCount.current = response.success.length
      } else {
        // alert(2)
        setAllRequests(false);
      }
    }
    // alert(timeInterval("2023-12-24T03:33:45.756Z"))
    // alert(3)
    allRequests === "" && getAllRequests();
    // alert(4)
    // getAllRequests()
  }, [allRequests]);
  return (
    <div className="relative">
       <p id="top" className="text-lg font-bold varela p-2 border-b border-slate-300">
          All Requests {requestsCount.current >=1 && <span>({requestsCount.current})</span>}
        </p>
      {showRequestInfo.state && (
        <div
        onClick={() => setShowRequestInfo({...showRequestInfo, state: false})}
          className="fixed z-20 bg-slate-400 h-full w-full top-14 rounded-t-3xl fadeInDown"
        >
          <RequestInfo user={user} content={showRequestInfo.content} calculateDuration={calculateDuration} setClientContent={setClientContent} setNavItem={setNavItem} />
        </div>
      )}
      <div className=" border-b border-slate-200 my-1 p-5">
        <input className="w-full ring-red-600 outline-red-700 border-slate-400 border rounded-full px-3 py-1" />
      </div>
      <p className="text-xs text-slate-400 px-5 py-2">
        Browse through here to see if there are any requests you could help
        withbk or requests that match your preference
      </p>

      {allRequests === "" && 
      <div className="mt-10 p-5">
        <p className="text-lg text-blue-700 font-bold mb-5">... Fetching requests</p>
        <div className="relative h-1 w-full rounded-full bg-slate-300 overflow-hidden" >
        <div className="progress left-right  h-full rounded-full w-full bg-pink-600"></div>
      </div>
        </div>
       
      }


      { allRequests  &&
        allRequests.map((items) => {
          return (
            <div>
              {calculateDuration(items.expiresOn, false) === "active" ? (
                <div
                  key={items}
                  onClick={() => { setShowRequestInfo({content: items, state: true});  }}
                  className=" bg-slate-50 border border-slate-300 bg-opacity- m-2 rounded-lg p-3 space-y-"
                >
                   <p className="text-[11px] text-red-500">
                    {user.email === items.reqShaker && <span>"You made this request"</span> }
                  </p>
                  
                  <p className="text-[11px] text-slate-500">
                    Posted {calculateDuration(items.createdAt)}
                  </p>
                  <p className="capitaliz text-sm text-black">
                    {items.requestTitle}{" "}
                  </p>
                  <div className="text-slate-50 text-[10px] my-2">
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
                  <div className="relative text-sm text-slate-400 font-light bg-red-30 h-10 overflow-hidden ">
                    <p className="absolute bottom-0 right-0 bg-slate-50 px-1">
                      ...
                    </p>
                    {items.requestDescription}
                  </div>
                  <div className="flex items-center text-sm -ml-1 my-1">
                    <LocationOnOutlined sx={{ fontSize: 20 }} />
                    <p>{items.landmark} </p>
                  </div>
                  <div className="text-sm flex gap-2">
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
              ) : (
                <div
                  key={items}
                  className="relative bg-slate-50 border border-red-200 bg-opacity- m-2 rounded-lg p-3 space-y-"
                >
                  <div className="absolute z-10 rounded-lg top-0 left-0 w-full h-full bg-red-500 bg-opacity-15"></div>
                  <p className="text-[11px] text-slate-300">
                    Posted {calculateDuration(items.createdAt)}
                  </p>
                  <p className="capitaliz text-sm text-slate-300">
                    {items.requestTitle}{" "}
                  </p>
                  <div className="text-slate-50 text-[10px] my-2">
                    {items.charges === "" ? (
                      <span className="px-1 py-1 text-ce bg-blue-400 rounded">
                        Free Service
                      </span>
                    ) : (
                      <span className="px-1 py-1 text-ce bg-green-200 rounded">
                        Paid Service
                      </span>
                    )}
                  </div>
                  <p className="relative text-sm text-slate-300 font-light bg-red-30 h-10 overflow-hidden ">
                    <p className="absolute bottom-0 right-0 bg-slate-50 px-1">
                      ...
                    </p>
                    {items.requestDescription}
                  </p>
                  <div className="flex items-center text-sm -ml-1 my-1 text-slate-300">
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
              )}
            </div>
          );
        })}
        {(allRequests === false) &&
        <div className="p-5 text-xl font-bold text-red-700">
          <p>No requests yet</p>
         </div> 
         }
    </div>
  );
}

export default AllRequests;
