import React from 'react'

function Alerts({theme}) {
  return (
    <div className={`relative pt-14 ${theme === "lightMode" ? "bg-white" : "bg-gray-900"} h-screen`}>
      <p id="top" className={`text-lg font-bold varela p-2 border-slate-300 ${theme === "lightMode" ? "text-slate-100": "text-white" }`}>
          Alerts
        </p>
    </div>
  )
}

export default Alerts
