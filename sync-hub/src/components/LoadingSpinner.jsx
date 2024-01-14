import React from 'react'

function LoadingSpinner() {
  return (
    <div className="relative size-10 rounded-full bg-slate-700">
    <div className="absolute size-10 rounded-full border-2 border-t-slate-100  border-x-slate-700 border-b-slate-700 animate-spin"></div>
  </div>
  )
}

export default LoadingSpinner;
