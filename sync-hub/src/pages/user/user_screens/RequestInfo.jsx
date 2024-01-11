import React from "react";
import { useNavigate } from "react-router-dom";

function RequestInfo({ user, content, calculateDuration, setClientContent, setNavItem, theme }) {

  let navigate = useNavigate()
  return (
    <div className={` rounded-t-xl h-full  ${theme === "lightMode" ? "bg-white" : "bg-gray-900"}`}>
      <div className="p-5 bg-red-30">
        <div className="py-5 border-b">
          <p className={`varela text-sm ${theme === "lightMode" ? "text-black" : "text-white"}`}>{content.requestTitle}</p>
          <p className="text-slate-400 text-xs">
            Posted {calculateDuration(content.createdAt)}
          </p>
        </div>

        <div className="py-5 border-b">
          <p className="text-slate-500 text-sm">{content.requestDescription} </p>
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
          {content.charges && <p className="bg-red-30 text-slate-700 text-base">{content.charges} Naira</p>}
        </div>

        <div className="py-5 border-b">
          <p className="text-slate-500 text-sm">Request is valid and available until: </p>
          <p className="text-base text-slate-700">{content.expiresOn.slice(0,10).split("-").reverse().join("-")} </p>
        </div>

        <div className="py-5 border- space-y-1 text-base">
          <p>About the client</p>
          <div className="">
          <p className="text-slate-500 text-sm">Contact: <span className="text-slate-800">{content.phone}</span></p>
          <p className="text-sm text-slate-500">Location: <span className="text-slate-800">{content.landmark}, {content.city}, {content.country}</span> </p>
          </div>
          
        </div>

        <div className="my-3">
        {user.email === content.reqShaker && <p className="text-red-600 font-bold text-center">You made this request</p>}
          {user.email === content.reqShaker ? <button onClick={(e)=> e.stopPropagation()} className="w-full text-center bg-orange-200 text-white varela p-1 rounded-full">Message Client Now</button> : <button onClick={()=> {setClientContent(content); navigate("/user/messages") }} className="w-full text-center bg-orange-500 active:bg-green-500 text-white varela p-1 rounded-full">Message Client Now</button>}
        </div>


      </div>
    </div>
  );
}

export default RequestInfo;
