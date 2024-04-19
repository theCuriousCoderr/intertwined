import React, { useEffect } from "react";
import ConcentricCircles from "../../../components/ConcentricCircles";

function Alerts({ theme }) {
  useEffect(() => {
    let title = document.querySelector("title");
    title.innerHTML = "intertwined | Alerts";
  }, []);
  return (
    <div
      className={`relative z-10 isolation-auto pt-14 pb-20 lg:pl-40 ${
        theme === "lightMode"
          ? "bg-gradient-to-br from-purple-800 to-blue-600 h-screen"
          : "bg-gray-900 h-screen"
      } `}
    >
     <ConcentricCircles theme={theme} />
      <p
        id="top"
        className={`text-lg font-bold varela p-2 border-slate-300 ${
          theme === "lightMode" ? "text-slate-100" : "text-white"
        }`}
      >
        Alerts
      </p>
      <div className="mt-10 p-5">
          <p className="text-base text-slate-200 font-bold mb-5">
            You will receive notification alerts here.
            <br />
            <br />
           
            <br />
            <br />
          </p>
        </div>
    </div>
  );
}

export default Alerts;
