import { ArrowBack } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import putHook from "../../../apiHooks/putHook";
let dotEnv = import.meta.env

function ComplaintsPage({ theme, user, setUser }) {
  const [sendMessageState, setSendMessageState ] = useState(false)
  const [suggestionDetails, setSuggestionDetails] = useState({
    name: "",
    message: ""
  })
  let navigate = useNavigate();

  useEffect(()=> {
    let title = document.querySelector("title");
    title.innerHTML = "intertwined | Complaints";

  }, [])

  function handleSuggestionDetailsFormChange(e) {
    setSuggestionDetails({...suggestionDetails, [e.target.name]: e.target.value})
  }

  let baseURL;
  if (dotEnv.MODE === "development") {
    baseURL = dotEnv.VITE_DEV_URL;
  } else {
    baseURL = dotEnv.VITE_PROD_URL;
  }

  async function handleSuggestionFormSubmit(e) {
    e.preventDefault()
    // setSendMessageState(true);
    // // e.preventDefault();
    // let url = baseURL + "/change-user-details";
    // let response = await putHook(url, {
    //   email: user.email,
    //   address: fullName,
    //   tag: "fullName",
    // });
    // if (response.success) {
    //   setUser(response.success);
    // } else {
    //   alert("User Full Name Change Failed");
    // }
    // setChangeFullNameState(false);
    alert("N/A: Work In Progress")
  }
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
      </div>

      <form onSubmit={handleSuggestionFormSubmit} className="p-5">
        <div>
          <label htmlFor="name" className={`text-xs font-semibold ${theme === "lightMode" ? "text-black": "text-white"}`}>
            Name
          </label>
          <div className="group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
            <input
              id="name"
              name="name"
              value={suggestionDetails.name}
              onChange={handleSuggestionDetailsFormChange}
              placeholder="Enter name"
              className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm h-10"
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className={`text-xs font-semibold ${theme === "lightMode" ? "text-black": "text-white"}`}>
            Message
          </label>
          <div className="group p-1 h-20 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
            <textarea
              id="message"
              name="message"
              value={suggestionDetails.message}
              onChange={handleSuggestionDetailsFormChange}
              placeholder="Enter message"
              className="group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm h-full"
            />
          </div>
        </div>
        
        <div>
          {!sendMessageState ? <button className="h-10 w-40 text-center rounded bg-orange-500 text-white my-5">Send Messsage</button> : <button disabled className="h-10 w-40 text-center rounded bg-slate-300 text-white my-5">Send Messsage</button> }
        </div>
      </form>

      <div className={`text- font-semibold ${theme === "lightMode" ? "text-black": "text-white"}`}>
        <p>Contact Developer in other ways</p>
        <p className="text-green-600">Logout - Open Menu bar - Open About Us </p>

        

      </div>
    </div>
  );
}

export default ComplaintsPage;
