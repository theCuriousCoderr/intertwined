import React, { useState } from "react";
import putHook from "../apiHooks/putHook";
let dotEnv = import.meta.env

function EditUserAddress({user, setUser}) {
  const [changeAddressState, setChangeAddressState] = useState(false)

  let baseURL;
  if (dotEnv.MODE === "development") {
    baseURL = dotEnv.VITE_DEV_URL;
  } else {
    baseURL = dotEnv.VITE_PROD_URL;
  }

  async function handleAddressSubmit() {
    setChangeAddressState(true);
    // e.preventDefault();
    let userAddress = document.getElementById("address").value
    let url = baseURL + "/change-user-details";
    let response = await putHook(url, {
      email: user.email,
      address: userAddress,
      tag: "address",
    });
    if (response.success) {
      setUser(response.success);
    } else {
      alert("User Location Change Failed");
    }
    setChangeAddressState(false);
  }

  return (
    <div onClick={(e)=> {e.stopPropagation()}} className="p-5 relative">
       {changeAddressState && (
        <div className="absolute top-0 left-0 rounded-t-3xl z-10 w-full h-full bg-gray-900 bg-opacity-80 flex items-center flex-col justify-center">
          <p className="text-white font-medium my-5 animate-pulse">
            ... Changing House Address
          </p>
          <div className="relative size-10 rounded-full bg-slate-700">
            <div className="absolute size-10 rounded-full border-2 border-t-slate-100  border-x-slate-700 border-b-slate-700 animate-spin"></div>
          </div>
        </div>
      )}
      <p id="top" className="text-2xl font-bold varela">
        Edit Address
      </p>
      <div className="">
          <label htmlFor="address">House Address</label>
          <br />
          <textarea
            name="address"
            id="address"
            className="border border-slate-500 rounded px-2 py-1 w-full resize-none"
          />
      </div>
      <div className="">
          <button
          onClick={handleAddressSubmit}
            type="submit"
            className="w-full p-2 bg-green-500 active:bg-green-700 rounde rounded-md text-slate-100"
          >
            Change House Address
          </button>
        </div>
    </div>
  );
}

export default EditUserAddress;
