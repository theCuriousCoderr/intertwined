import React, { useEffect, useState } from "react";
import postHook from "../../../apiHooks/postHook.js";
import ToastAlert from "../../../components/ToastAlert.jsx";
let dotEnv = import.meta.env;

function AddRequest({ user }) {
  const [postRequestButtonState, setPostRequestButtonState] = useState(true);
  const [serviceCharges, setServiceCharges] = useState(true);
  const [requestDetails, setRequestDetails] = useState({
    reqShaker: user.email,
    requestTitle: "",
    requestDescription: "",
    charges: "",
    country: "",
    city: "",
    landmark: "",
    phone: "",
    expiresOn: "",
  });
  const [toastInfo, setToastInfo] = useState({
    color: "",
    text: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleRequestDetailsFormChange(e) {
    let name = e.target.name;
    let val = e.target.value;
    setRequestDetails({ ...requestDetails, [name]: val });
  }

  let baseURL;
  if (dotEnv.MODE === "development") {
    baseURL = dotEnv.VITE_DEV_URL;
  } else {
    baseURL = dotEnv.VITE_PROD_URL;
  }

  async function handleRequestDetailsFormSubmit(e) {
    setPostRequestButtonState(false);
    let top = document.getElementById("top");
    e.preventDefault();
    let url = baseURL + "/user/submit-request";
    let response = await postHook(url, requestDetails);
    if (response.success) {
      setRequestDetails({
        requestTitle: "",
        requestDescription: "",
        charges: "",
        country: "",
        city: "",
        landmark: "",
        phone: "",
        expiresOn: "",
      });
      top.scrollIntoView(true);
      setToastInfo({ color: "green", text: ["Success!", response.success] });
    } else if (response.warning) {
      alert(1);
      setToastInfo({ color: "blue", text: ["Warning!", response.warning] });
    } else {
      top.scrollIntoView(true);
      console.log(response.error);
      setToastInfo({ color: "red", text: ["Error!", response.error] });
    }
    setPostRequestButtonState(true);
    setTimeout(() => {
      setToastInfo({ color: "", text: "" });
    }, 3000);
  }
  return (
    <div className="bg-[rgba(81,80,91,0.3) relative mt-14 pb-20">
      {toastInfo.text !== "" && (
        <ToastAlert color={toastInfo.color} text={toastInfo.text} />
      )}
      <div>
        <p
          id="top"
          className="text-lg font-bold varela p-2 border-b border-slate-300"
        >
          Post a request
        </p>
        <form
          id="addRequestForm"
          name="addRequestForm"
          onSubmit={handleRequestDetailsFormSubmit}
          className="p-5 space-y-5"
        >
          <div>
            <label htmlFor="requestTitle" className="text-sm font-semibold">
              Short Request Title
            </label>
            <div className="group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
              <input
                maxLength={30}
                required
                value={requestDetails.requestTitle}
                onChange={handleRequestDetailsFormChange}
                id="requestTitle"
                name="requestTitle"
                placeholder="I want to collect movies"
                className="placeholder:text-xs group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="requestDescription"
              className="text-sm font-semibold"
            >
              Request Description
            </label>
            <div className="group p- focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
              <textarea
                required
                value={requestDetails.requestDescription}
                onChange={handleRequestDetailsFormChange}
                id="requestDescription"
                name="requestDescription"
                placeholder="I need the complete seasons of Game of Thrones. Anyone who has should please reach out to me "
                className="placeholder:text-xs group-focus:ring-orange-500 outline-none ring-1 w-full h-20 rounded-md p-2 text-sm"
              />
            </div>
          </div>

          <div className="border border-slate-300 p-2 rounded-md">
            <label htmlFor="requestTitle" className="text-sm font-semibold">
              Do you need it to be a free service or not ?
              <span className="text-red-500 ml-1 text-[10px] block leading-3 mb-2">
                # A paid service can attract more people than a free service
              </span>
            </label>
            <div className="flex flex-wrap gap-5 text-xs px-5">
              <div className="flex items-center gap-1">
                <input
                  checked={serviceCharges}
                  onChange={() => setServiceCharges(!serviceCharges)}
                  type="radio"
                  className="accent-orange-500"
                />{" "}
                <span>Free Service</span>
              </div>
              <div className="flex items-center gap-1">
                <input
                  checked={!serviceCharges}
                  onChange={() => setServiceCharges(!serviceCharges)}
                  type="radio"
                  className="accent-orange-500"
                />{" "}
                <span>Paid Service</span>
              </div>
              {!serviceCharges && (
                <div className="w-full space-y-1 group p-1 focus-within:bg-orange-300 focus-within:bg-opacity-50 rounded-lg">
                  <label htmlFor="charges">
                    How much are you willing to pay? (Naira)
                  </label>
                  <input
                    required
                    value={requestDetails.charges}
                    onChange={handleRequestDetailsFormChange}
                    id="charges"
                    name="charges"
                    placeholder="500"
                    className="placeholder:text-xs group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="border border-slate-300 p-2 rounded-md">
            <label htmlFor="requestTitle" className="text-sm font-semibold">
              Your Location
            </label>
            <div className="flex flex-wrap gap-5 text-xs">
              <div className="w-[40%] space-y-1 group p-1 focus-within:bg-orange-300 focus-within:bg-opacity-50 rounded-lg">
                <label htmlFor="country">Country</label>
                <input
                  required
                  value={requestDetails.country}
                  onChange={handleRequestDetailsFormChange}
                  id="country"
                  name="country"
                  placeholder="Nigeria"
                  className="placeholder:text-xs group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
                />
              </div>
              <div className="w-[40%] space-y-1 group p-1 focus-within:bg-orange-300 focus-within:bg-opacity-50 rounded-lg">
                <label htmlFor="city">City</label>
                <input
                  required
                  value={requestDetails.city}
                  onChange={handleRequestDetailsFormChange}
                  id="city"
                  name="city"
                  placeholder="Ibadan"
                  className="placeholder:text-xs group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
                />
              </div>
              <div className="w-full space-y-1 group p-1 focus-within:bg-orange-300 focus-within:bg-opacity-50 rounded-lg">
                <label htmlFor="landmark">
                  Landmark Location
                  <br /> (A location that almost/precisely describes your area)
                </label>
                <input
                  required
                  value={requestDetails.landmark}
                  onChange={handleRequestDetailsFormChange}
                  id="landmark"
                  name="landmark"
                  placeholder="Agbowo"
                  className="placeholder:text-xs group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="border border-slate-300 p-2 rounded-md">
            <label htmlFor="phone" className="text-sm font-semibold">
              Phone Number
            </label>
            <div className="group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
              <input
                minLength={11}
                maxLength={11}
                required
                value={requestDetails.phone}
                onChange={handleRequestDetailsFormChange}
                id="phone"
                name="phone"
                placeholder="07037887923"
                className="placeholder:text-xs group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
              />
            </div>
          </div>

          <div className="border border-slate-300 p-2 rounded-md">
            <label htmlFor="expiresOn" className="text-sm font-semibold">
              When will this request expire
              <span className="text-red-500 ml-1 text-[10px] block leading-3 mb-2">
                (When will you no longer require/need this service)
              </span>
            </label>
            <div className="group p-1 focus-within:bg-orange-500 focus-within:bg-opacity-50 rounded-lg">
              <input
                type="datetime-local"
                required
                value={requestDetails.expiresOn}
                onChange={handleRequestDetailsFormChange}
                id="expiresOn"
                name="expiresOn"
                placeholder="I want to buy something in Agbowo"
                className="placeholder:text-xs group-focus:ring-orange-500 outline-none ring-1 w-full rounded-md p-1 text-sm"
              />
            </div>
          </div>

          <div>
            {postRequestButtonState ? (
              <button className="bg-orange-500 active:bg-green-500 p-2 w-full text-center text-white varela rounded-md">
                Submit request
              </button>
            ) : (
              <button
                disabled
                className="bg-gray-300 relative p-2 w-full text-center text-white varela rounded-md"
              >
                <div className="absolute left-[45%] border-2 border-t-black border-b-gray-950 border-l-gray-300 border-r-gray-300 size-5 rounded-full animate-spin"></div>
                Submit request
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRequest;
