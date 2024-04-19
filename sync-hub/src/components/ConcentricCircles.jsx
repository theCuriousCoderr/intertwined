import React from 'react'

function ConcentricCircles({theme}) {
  return (
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
  )
}

export default ConcentricCircles