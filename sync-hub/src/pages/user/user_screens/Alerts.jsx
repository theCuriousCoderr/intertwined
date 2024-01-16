import React from 'react'

function Alerts({theme}) {
  return (
    <div className={`relative z-10 isolation-auto pt-14 pb-20 ${theme === "lightMode" ? "bg-gradient-to-br from-purple-800 to-blue-600 h-screen" : "bg-gray-900 h-screen" } `}>
       <div className={`fixed -z-10 -right-5 flex items-center justify-center`}>
      <div className={`absolute size-[50rem] border ${theme === "lightMode" ? "border-slate-500" : "border-slate-700" } border-slate-500 rounded-full`}></div>
      <div className={`absolute size-[40rem] border ${theme === "lightMode" ? "border-slate-500" : "border-slate-700" } border-slate-500 rounded-full`}></div>
      <div className={`absolute size-[30rem] border ${theme === "lightMode" ? "border-slate-500" : "border-slate-700" } border-slate-500 rounded-full`}></div>
      <div className={`absolute size-[20rem] border ${theme === "lightMode" ? "border-slate-500" : "border-slate-700" } border-slate-500 rounded-full`}></div>

      </div>
      <p id="top" className={`text-lg font-bold varela p-2 border-slate-300 ${theme === "lightMode" ? "text-slate-100": "text-white" }`}>
          Alerts
        </p>
    </div>
  )
}

export default Alerts
