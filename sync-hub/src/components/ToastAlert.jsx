import { CancelOutlined, CheckCircleOutline, ReportProblemOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ping from '../assets/audio/ping.mp3'

function ToastAlert({color, text}) {
  const [toastColor, setToastColor] = useState("")
    let type = text[0]
    let message = text[1]
    useEffect(()=> {
      if (color === "green") {
        setToastColor("bg-green-500")
      } else if (color === "red") {
        setToastColor("bg-red-500")
      } else {
        setToastColor("bg-blue-500")
      }
    }, [])
    
  return (
    <div className="absolute z-50 left-0 w-full lg:w-1/3 lg:left-1/3 bg-red-30 p-2 fadeInUp">
      <audio autoPlay>
        <source src={ping} type="audio/mp3" />
      </audio>
      <div className={`${toastColor} p-2 rounded-lg space-y-3`}>
        <div className="flex items-center gap-2">
            <div className="size-10 bg-red-30 flex justify-center items-center text-white">
                {color === "green" && <CheckCircleOutline />}
                {color === "red" && <CancelOutlined />}
                {color === "blue" && <ReportProblemOutlined />}
            </div>
            <div>
                <p className="text-white text-lg font-semibold">{type}</p>
                <p className="text-slate-100 text-xs lg:text-xl">{message}</p>
            </div>
            
        </div>
      </div>
    </div>
  );
}
export default ToastAlert;
