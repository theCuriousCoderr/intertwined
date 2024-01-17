import React, { useState } from "react";
import putHook from "../apiHooks/putHook";
let dotEnv = import.meta.env;

function EditUserFullName({ user, setUser }) {
  const [changeFullNameState, setChangeFullNameState] = useState(false);
  const [userName, setUserName] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
  });

  let baseURL;
  if (dotEnv.MODE === "development") {
    baseURL = dotEnv.VITE_DEV_URL;
  } else {
    baseURL = dotEnv.VITE_PROD_URL;
  }

  function handleNameEdit(e) {
    setUserName({ ...userName, [e.target.name]: e.target.value });
  }
  async function handleNameSubmit(e) {
    setChangeFullNameState(true);
    e.preventDefault();
    let url = baseURL + "/change-user-details";
    let fullName =
      userName.lastName + " " + userName.firstName + " " + userName.middleName;
    let response = await putHook(url, {
      email: user.email,
      fullName: fullName,
      tag: "fullName",
    });
    if (response.success) {
      setUser(response.success);
    } else {
      alert("User Full Name Change Failed");
    }
    setChangeFullNameState(false);
  }
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="p-5 relative"
    >
      {changeFullNameState && (
        <div className="absolute top-0 left-0 rounded-t-3xl z-10 w-full h-full bg-gray-900 bg-opacity-80 flex items-center flex-col justify-center">
          <p className="text-white font-medium my-5 animate-pulse">
            ... Changing User Full Name
          </p>
          <div className="relative size-10 rounded-full bg-slate-700">
            <div className="absolute size-10 rounded-full border-2 border-t-slate-100  border-x-slate-700 border-b-slate-700 animate-spin"></div>
          </div>
        </div>
      )}
      <p id="top" className="text-2xl font-bold varela">
        Edit Full Name
      </p>
      <form onSubmit={handleNameSubmit} className="space-y-5">
        <div className="">
          <label htmlFor="firstName">First Name</label>
          <br />
          <input
            name="firstName"
            value={userName.firstName}
            onChange={handleNameEdit}
            className="border border-slate-500 rounded px-2 py-1"
          />
        </div>
        <div className="">
          <label htmlFor="lastName">Last Name (surname)</label>
          <br />
          <input
            name="lastName"
            value={userName.lastName}
            onChange={handleNameEdit}
            className="border border-slate-500 rounded px-2 py-1"
          />
        </div>
        <div className="">
          <label htmlFor="middleName">Middle Name</label>
          <br />
          <input
            name="middleName"
            value={userName.middleName}
            onChange={handleNameEdit}
            className="border border-slate-500 rounded px-2 py-1"
          />
        </div>
        <div className="">
          <button
            type="submit"
            className="w-full p-2 bg-green-500 active:bg-green-700 rounde rounded-md text-slate-100"
          >
            Change Full Name
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUserFullName;
