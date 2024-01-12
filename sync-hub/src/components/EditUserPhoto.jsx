import React from "react";

function EditUserPhoto({ changeImageState, user, handleUserDetailsEdit }) {
  return (
    <div className="">
      <div className="p-5">
        <p id="top" className="text-2xl font-bold varela">
          Edit Photo
        </p>
      </div>
      <div className="relative bg-gray-20 w-full rounded-full flex items-center justify-center my-5">
        {changeImageState && (
          <div className="absolute size-48 rounded-full bg-black flex items-center justify-center">
            <div className="size-10 border-4 border-t-slate-50 border-l-slate-800 border-r-slate-800 border-b-slate-800 animate-spin rounded-full"></div>
          </div>
        )}
        {user.photo ? (
          <img src={user.photo} className="size-48 rounded-full object-cover" />
        ) : (
          <div className="size-48 bg-slate-300 flex items-center justify-center rounded-full">
            <Avatar />
          </div>
        )}
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative mb-10 w-32 mx-auto bg-red-50"
      >
        <input
          name="photo"
          id="photo"
          type="file"
          onChange={handleUserDetailsEdit}
          className="absolute w-full h-full bg-red-30 opacity-0"
        />
        <button className="w-full p-2 bg-green-400 active:bg-green-700 rounde rounded-md text-slate-100">
          Change Image
        </button>
      </div>
    </div>
  );
}

export default EditUserPhoto;
