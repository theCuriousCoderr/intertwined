import React, { useEffect, useState } from "react";
import calculateDuration from "../helper_functions/calculateDuration";
import getHook from "../../../apiHooks/getHook";
import putHook from "../../../apiHooks/putHook";
import ToastAlert from "../../../components/ToastAlert";
import { CancelOutlined } from "@mui/icons-material";
import deleteHook from "../../../apiHooks/deleteHook";
let dotEnv = import.meta.env;

function YourRequests({ user, allRequestsCache, setAllRequestsCache, theme }) {
  const [yourRequests, setYourRequests] = useState("");
  const [confirmRequestDelete, setConfirmRequestDelete] = useState(false);
  const [requestDeleteId, setRequestDeleteId] = useState("");
  const [toastInfo, setToastInfo] = useState({
    color: "",
    text: "",
  });

  let baseURL;
  if (dotEnv.MODE === "development") {
    baseURL = dotEnv.VITE_DEV_URL;
  } else {
    baseURL = dotEnv.VITE_PROD_URL;
  }

  useEffect(() => {
    let title = document.querySelector("title");
    title.innerHTML = "intertwined | Your Requests";
    async function getAllRequests() {
      let url = baseURL + "/get-all-requests";

      let response = await getHook(url);
      let requests = response.success
        .filter((item) => item.reqShaker === user.email)
        .reverse();
      if (requests.length >= 1) {
        setYourRequests(requests);
      } else {
        setYourRequests(false);
      }
    }
    if (allRequestsCache) {
      let requests = allRequestsCache
        .filter((item) => item.reqShaker === user.email)
        .reverse();
      if (requests.length >= 1) {
        setYourRequests(requests);
      } else {
        setYourRequests(false);
      }
    } else {
      getAllRequests();
    }
  }, []);

  async function deleteRequest() {
    let url = baseURL + "/delete-user-request";
    let response = await deleteHook(url, { requestId: requestDeleteId });
    if (response.success) {
      setToastInfo({ color: "green", text: ["Success", response.success] });
    } else {
      setToastInfo({
        color: "red",
        text: ["Error", response.warning || response.error],
      });
    }
    setRequestDeleteId("");
    setConfirmRequestDelete(false);
    setTimeout(() => {
      setToastInfo({ color: "", text: "" });
      navigate("/user/all-requests");
    }, 3000);
    setAllRequestsCache("");
  }

  return (
    <div
      className={`relative z-10 isolation-auto pt-14 pb-20 ${
        theme === "lightMode"
          ? "bg-gradient-to-br from-purple-800 to-blue-600 h-screen"
          : "bg-gray-900 h-screen"
      } `}
    >
      <div className={`fixed -z-10 -right-5 flex items-center justify-center`}>
        <div
          className={`absolute size-[50rem] border ${
            theme === "lightMode" ? "border-slate-500" : "border-slate-700"
          } border-slate-500 rounded-full`}
        ></div>
        <div
          className={`absolute size-[40rem] border ${
            theme === "lightMode" ? "border-slate-500" : "border-slate-700"
          } border-slate-500 rounded-full`}
        ></div>
        <div
          className={`absolute size-[30rem] border ${
            theme === "lightMode" ? "border-slate-500" : "border-slate-700"
          } border-slate-500 rounded-full`}
        ></div>
        <div
          className={`absolute size-[20rem] border ${
            theme === "lightMode" ? "border-slate-500" : "border-slate-700"
          } border-slate-500 rounded-full`}
        ></div>
      </div>
      {toastInfo.text !== "" && (
        <ToastAlert color={toastInfo.color} text={toastInfo.text} />
      )}
      <p
        id="top"
        className={`text-lg font-bold varela p-2 border-b border-slate-300 ${
          !(theme === "lightMode") ? "text-white" : "text-slate-100"
        }`}
      >
        Your Requests{" "}
        {yourRequests.length && <span>({yourRequests.length || ""})</span>}
      </p>

      {yourRequests === false && (
        <div className="p-5 text-xl font-bold text-slate-200">
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
            <div
              key={items._id}
              className={`relative m-2 rounded-lg p-3 ${
                theme === "lightMode"
                  ? "bg-white border border-slate-100 shadow"
                  : "bg-gray-800 border border-gray-600 shadow-sm shadow-slate-600"
              }`}
            >
              {confirmRequestDelete && (
                <div
                  onClick={() => setConfirmRequestDelete(false)}
                  className="fixed top-0 z-50 bg-black bg-opacity-50 left-0 h-full w-full flex pt-[50%] justify-center"
                >
                  <div className="w-[80%] rounded-md bg-slate-100 h-52 p-5">
                    <div className="w-20 mx-auto flex items-center justify-center text-red-500 bg-red-40">
                      <CancelOutlined sx={{ fontSize: 60 }} />
                    </div>
                    <p className="text-center text-xl font-medium varela">
                      Are you sure ?
                    </p>
                    <p className="text-slate-500 text-center text-xs">
                      Do you really want to delete this request? This process
                      cannot be undone.{" "}
                    </p>
                    <div className="flex items-center justify-evenly my-5">
                      <div
                        onClick={() => setConfirmRequestDelete(false)}
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
                            deleteRequest();
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
              <div className="absolute w-20 right-5">
                <button
                  // onClick={() => deleteRequest(items._id)}
                  onClickCapture={() => {
                    setRequestDeleteId(items._id);
                    setConfirmRequestDelete(true);
                  }}
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

              <p
                className={`text-[11px]  ${
                  theme === "lightMode" ? " text-slate-500" : " text-slate-400"
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
              <div
                className={`relative text-sm font-light bg-red-30 h-10 overflow-hidden  ${
                  theme === "lightMode" ? "text-slate-500" : "text-slate-300"
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

              <div
                className={`my-1 text-xs flex gap-2  ${
                  theme === "lightMode" ? "text-black" : "text-slate-100"
                }`}
              >
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
