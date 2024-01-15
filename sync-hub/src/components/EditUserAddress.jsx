import React from "react";

function EditUserAddress() {
  return (
    <div className="p-5">
      <p id="top" className="text-2xl font-bold varela">
        Edit Address
      </p>
      <div className="">
          <label htmlFor="lastName">House Address</label>
          <br />
          <textarea
            name="lastName"
            // value={userName.lastName}
            // onChange={handleNameEdit}
            className="border border-slate-500 rounded px-2 py-1 w-full"
          />
      </div>
    </div>
  );
}

export default EditUserAddress;
