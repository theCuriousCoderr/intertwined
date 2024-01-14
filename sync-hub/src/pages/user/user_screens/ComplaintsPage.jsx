import { ArrowBack } from '@mui/icons-material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function ComplaintsPage({ theme, user, setUser }) {
    let navigate = useNavigate()
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`relative ${
        theme === "lightMode" ? "bg-white" : "bg-gray-900"
      } fixed z-50 w-full h-dvh overflow-hidden`}
    >
    <div
        className={`relative flex items-center justify-center py-5 border-slate-300 ${
          !(theme === "lightMode") && "text-white"
        }`}
      >
        <div
          onClick={() => navigate("/user/all-requests")}
          className="absolute w-full left-5"
        >
          <ArrowBack />
          
        </div>
        <p id="top" className="text-lg font-bold varela">
          Suggestions / Compaints
        </p>
      </div></div>
  )
}

export default ComplaintsPage
