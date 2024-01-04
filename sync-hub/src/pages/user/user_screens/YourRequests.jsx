import React, { useEffect, useState } from "react";
import calculateDuration from "../helper_functions/calculateDuration";
import getHook from "../../../apiHooks/getHook";
import putHook from "../../../apiHooks/putHook";
import ToastAlert from "../../../components/ToastAlert";
let dotEnv = import.meta.env;

function YourRequests({ user }) {
  const [yourRequests, setYourRequests] = useState("");
  const [confirmRequestDelete, setConfirmRequestDelete] = useState(false);
  const [requestDeleteId, setRequestDeleteId] = useState("")
  const [toastInfo, setToastInfo] = useState({
    color: "",
    text: ""
  })

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
      // alert(response.success.length)
      let requests = response.success
      .filter((item) => item.reqShaker === user.email)
      .reverse();
      if (requests.length >= 1) {
        setYourRequests(requests);
      } else {
        setYourRequests(false);
      }
    }
    getAllRequests(), [];
  });

  async function deleteRequest() {
    let url = baseURL + "/delete-user-request";
    let response = await putHook(url, { requestId: requestDeleteId });
    if (response.success) {
      setToastInfo({color: "green", text: ["Success", response.success]})
    } else {
      setToastInfo({color: "red", text: ["Error", response.warning || response.error]})
    }
    setRequestDeleteId("")
    setConfirmRequestDelete(false)
    setTimeout(() => {
      setToastInfo({color: "", text: "" })
  }, 3000);
  }

  return (
    <div className="relative">
      {toastInfo.text !== "" && <ToastAlert color={toastInfo.color} text={toastInfo.text} />}
      <p
        id="top"
        className="text-lg font-bold varela p-2 border-b border-slate-300"
      >
        Your Requests <span>({yourRequests.length || ""})</span>
      </p>

      {yourRequests === false && (
        <div className="p-5 text-xl font-bold text-red-700">
          <p>No requests yet</p>
        </div>
      )}

      {yourRequests === "" && (
        <div className="mt-10 p-5">
          <p className="text-lg text-blue-700 font-bold mb-5">
            ... Fetching Your Requests
          </p>
          <div className="relative h-1 w-full rounded-full bg-slate-300 overflow-hidden">
            <div className="progress left-right  h-full rounded-full w-full bg-pink-600"></div>
          </div>
        </div>
      )}

      {yourRequests &&
        yourRequests.map((items) => {
          return (
            <div className="relative bg-slate-50 border border-slate-300 bg-opacity- m-2 rounded-lg p-3 space-y-">
             { confirmRequestDelete && <div onClick={()=> setConfirmRequestDelete(false) } className="fixed top-0 z-50 bg-black bg-opacity-50 left-0 h-full w-full flex items-center justify-center">
                <div className="w-[80%] rounded-md bg-slate-100 p-5">
                  <p className="text-red-600 font-semibold text-base">
                    Are you sure you want to delete this request ?{" "}
                  </p>
                  <div className="flex items-center justify-evenly my-5">
                    <div onClick={()=> setConfirmRequestDelete(false) } className="w-[30%]">
                      <button className="text-center w-full p-1 bg-red-500 active:bg-red-700 rounded-md text-white">
                        No
                      </button>
                    </div>
                    <div className="w-[30%]">
                      <button onClick={(e) => { e.stopPropagation(); deleteRequest()}} className="text-center w-full p-1 bg-green-500 active:bg-green-700 rounded-md text-white">
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div> }
              <div className="absolute w-20 right-5">
                <button
                  // onClick={() => deleteRequest(items._id)}
                  onClickCapture={()=> {setRequestDeleteId(items._id); setConfirmRequestDelete(true)}}
                  className="w-full p-1 rounded-md text-slate-100 bg-red-500 active:bg-red-700 text-sm"
                >
                  DELETE
                </button>
              </div>
              <p className="text-[11px] text-red-500">
                {user.email === items.reqShaker && (
                  <span>"You made this request"</span>
                )}
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
              {/* <div className="flex items-center text-sm -ml-1 my-1">
                    <LocationOnOutlined sx={{ fontSize: 20 }} />
                    <p>{items.landmark} </p>
                  </div> */}
              <div className="text-sm flex gap-2">
                Request status:{" "}
                <div>
                  {calculateDuration(items.expiresOn, false) === "active" ? (
                    <p className="text-green-500 font-semibold">Active</p>
                  ) : (
                    <p className="text-red-500 font-semibold">Expired</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default YourRequests;
