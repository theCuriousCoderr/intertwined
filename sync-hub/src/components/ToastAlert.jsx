import { CancelOutlined, CheckCircleOutline, ReportProblemOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

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
    <div className="absolute z-50 left-0  w-full bg-red-30 p-2 fadeInUp">
      <div className={`${toastColor} p-2 rounded-lg space-y-3`}>
        <div className="flex items-center gap-2">
            <div className="size-10 bg-red-30 flex justify-center items-center text-white">
                {color === "green" && <CheckCircleOutline />}
                {color === "red" && <CancelOutlined />}
                {color === "blue" && <ReportProblemOutlined />}
            </div>
            <div>
                <p className="text-white text-lg font-semibold">{type}</p>
                <p className="text-slate-100 text-xs">{message}</p>
            </div>
            
        </div>
      </div>
    </div>
  );
}
export default ToastAlert;
