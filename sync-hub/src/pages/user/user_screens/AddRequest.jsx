import React, { useEffect, useState } from "react";
import postHook from "../../../apiHooks/postHook.js";
import ToastAlert from "../../../components/ToastAlert.jsx";
import { useNavigate } from "react-router-dom";
import ConcentricCircles from "../../../components/ConcentricCircles.jsx";
let dotEnv = import.meta.env;

function AddRequest({ user, theme, setAllRequestsCache }) {
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
    createdAt: "",
  });
  const [toastInfo, setToastInfo] = useState({
    color: "",
    text: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    let title = document.querySelector("title");
    title.innerHTML = "intertwined | Add Request";
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
    let response = await postHook(url, {
      ...requestDetails,
      createdAt: new Date().toISOString(),
    });
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
      setPostRequestButtonState(true);
      setTimeout(() => {
        setToastInfo({ color: "", text: "" });
        navigate("/user/all-requests");
      }, 3000);
      setAllRequestsCache("");
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
    <div
      className={`relative z-10 isolation-auto pt-14 pb-20 lg:pl-40 ${
        theme === "lightMode"
          ? "bg-gradient-to-br from-purple-800 to-blue-600 h-full"
          : "bg-gray-900 h-full"
      } `}
    >
     <ConcentricCircles theme={theme} />
      {toastInfo.text !== "" && (
        <ToastAlert color={toastInfo.color} text={toastInfo.text} />
      )}
      <div className="lg:w-2/3">
        <p
          id="top"
          className={`text-lg font-bold varela p-2 border-b lg:fixed lg:w-full ${
            theme === "lightMode"
              ? "border-slate-300 text-white "
              : "border-slate-500 text-white"
          }`}
        >
          Post a request
        </p>
        <form
          id="addRequestForm"
          name="addRequestForm"
          onSubmit={handleRequestDetailsFormSubmit}
          className="p-5 space-y-5 lg:pt-14"
        >
          <div>
            <label
              htmlFor="requestTitle"
              className={`text-sm font-semibold ${
                !(theme === "lightMode") ? "text-slate-100" : "text-slate-100"
              }`}
            >
              Short Request Title
            </label>
            <div
              className={`group p-1 focus-within:bg-opacity-20 rounded-lg ${
                theme === "lightMode"
                  ? "focus-within:bg-orange-900"
                  : "focus-within:bg-slate-100"
              }`}
            >
              <input
              spellCheck={false}
                maxLength={30}
                required
                value={requestDetails.requestTitle}
                onChange={handleRequestDetailsFormChange}
                id="requestTitle"
                name="requestTitle"
                placeholder="I want to collect movies"
                className={`placeholder:text-xs h-10 outline-none ring-1 w-full rounded-md px-2 text-sm ${
                  theme === "lightMode"
                    ? "group-focus:ring-orange-500 bg-slate-200 bg-opacity-20 text-slate-200"
                    : "group-focus:ring-slate-100 bg-slate-800 text-white placeholder:text-slate-600"
                }`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="requestDescription"
              className={`text-sm font-semibold ${
                !(theme === "lightMode") ? "text-slate-100" : "text-slate-100"
              }`}
            >
              Request Description
            </label>
            <div
              className={`group p-1 h-20 focus-within:bg-opacity-20 rounded-lg ${
                theme === "lightMode"
                  ? "focus-within:bg-orange-900"
                  : "focus-within:bg-slate-100"
              }`}
            >
              <textarea
                required
                spellCheck={false}
                value={requestDetails.requestDescription}
                onChange={handleRequestDetailsFormChange}
                id="requestDescription"
                name="requestDescription"
                placeholder="I need the complete seasons of Game of Thrones. Anyone who has should please reach out to me "
                className={`placeholder:text-xs h-full outline-none ring-1 w-full rounded-md p-2 resize-none text-sm ${
                  theme === "lightMode"
                    ? "group-focus:ring-orange-500 bg-slate-200 bg-opacity-20 text-slate-200"
                    : "group-focus:ring-slate-100 bg-slate-800 text-white placeholder:text-slate-600"
                }`}
              />
            </div>
          </div>

          <div className="border border-slate-300 p-2 rounded-md">
            <label
              htmlFor="requestTitle"
              className={`text-sm font-semibold ${
                !(theme === "lightMode") ? "text-slate-100" : "text-slate-100"
              }`}
            >
              Do you need it to be a free service or not ?
              <span
                className={` ${
                  theme === "lightMode" ? "text-slate-300" : "text-teal-400"
                } ml-1 text-[10px] block leading-3 mb-2`}
              >
                # A paid service can attract more response than a free service
              </span>
            </label>
            <div
              className={`flex flex-wrap gap-5 text-xs px-5 ${
                theme === "lightMode" ? "text-white" : "text-white"
              }`}
            >
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
                <div className="w-full space-y-1 group p-1 focus-within:bg-orange-200 focus-within:bg-opacity-20 rounded-lg">
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
                    type="number"
                    className={`placeholder:text-xs h-10  outline-none ring-1 w-full rounded-md p-1 text-sm ${
                      theme === "lightMode"
                        ? "group-focus:ring-orange-500 bg-slate-200 bg-opacity-20 text-white"
                        : "group-focus:ring-slate-100 bg-slate-800 text-white placeholder:text-slate-600"
                    }`}
                  />
                </div>
              )}
            </div>
          </div>

          <div
            className={`border border-slate-300 p-2 rounded-md ${
              theme === "lightMode" ? "text-white" : "text-white"
            }`}
          >
            <label htmlFor="requestTitle" className="text-sm font-semibold">
              Your Location
            </label>
            <div className="flex flex-wrap gap-5 text-xs">
              <div className="w-[40%] space-y-1 group p-1 focus-within:bg-orange-200 focus-within:bg-opacity-20 rounded-lg">
                <label htmlFor="country">Country</label>
                <input
                  required
                  value={requestDetails.country}
                  onChange={handleRequestDetailsFormChange}
                  id="country"
                  name="country"
                  placeholder="Nigeria"
                  className={`placeholder:text-xs h-10  outline-none ring-1 w-full rounded-md p-1 text-sm ${
                    theme === "lightMode"
                      ? "group-focus:ring-orange-500 bg-slate-200 bg-opacity-20"
                      : "group-focus:ring-slate-100 bg-slate-800 text-white placeholder:text-slate-600"
                  }`}
                />
              </div>
              <div className="w-[40%] space-y-1 group p-1 focus-within:bg-orange-200 focus-within:bg-opacity-20 rounded-lg">
                <label htmlFor="city">City</label>
                <input
                  required
                  value={requestDetails.city}
                  onChange={handleRequestDetailsFormChange}
                  id="city"
                  name="city"
                  placeholder="Ibadan"
                  className={`placeholder:text-xs h-10  outline-none ring-1 w-full rounded-md p-1 text-sm ${
                    theme === "lightMode"
                      ? "group-focus:ring-orange-500 bg-slate-200 bg-opacity-20"
                      : "group-focus:ring-slate-100 bg-slate-800 text-white placeholder:text-slate-600"
                  }`}
                />
              </div>
              <div className="w-full space-y-1 group p-1 focus-within:bg-orange-200 focus-within:bg-opacity-20 rounded-lg">
                <label htmlFor="landmark">
                  Landmark Location
                  <br /> (A location that almost/precisely describes your area)
                </label>
                <input
                spellCheck={false}
                  required
                  value={requestDetails.landmark}
                  onChange={handleRequestDetailsFormChange}
                  id="landmark"
                  name="landmark"
                  placeholder="Agbowo"
                  className={`placeholder:text-xs h-10  outline-none ring-1 w-full rounded-md p-1 text-sm ${
                    theme === "lightMode"
                      ? "group-focus:ring-orange-500 bg-slate-200 bg-opacity-20"
                      : "group-focus:ring-slate-100 bg-slate-800 text-white placeholder:text-slate-600"
                  }`}
                />
              </div>
            </div>
          </div>

          <div
            className={`border border-slate-300 p-2 rounded-md ${
              theme === "lightMode" ? "text-white" : "text-white"
            }`}
          >
            <label htmlFor="phone" className="text-sm font-semibold">
              Phone Number
            </label>
            <div className="group p-1 focus-within:bg-orange-100 focus-within:bg-opacity-20 rounded-lg">
              <input
                minLength={11}
                maxLength={11}
                required
                value={requestDetails.phone}
                onChange={handleRequestDetailsFormChange}
                id="phone"
                name="phone"
                placeholder="07037887923"
                className={`placeholder:text-xs h-10 outline-none ring-1 w-full rounded-md p-1 text-sm ${
                  theme === "lightMode"
                    ? "group-focus:ring-orange-500 bg-slate-200 bg-opacity-20"
                    : "group-focus:ring-slate-100 bg-slate-800 text-white placeholder:text-slate-600"
                }`}
              />
            </div>
          </div>

          <div
            className={`border border-slate-300 p-2 rounded-md ${
              theme === "lightMode" ? "text-white" : "text-white"
            }`}
          >
            <label htmlFor="expiresOn" className="text-sm font-semibold">
              When will this request expire
              <span
                className={` ${
                  theme === "lightMode" ? "text-slate-300" : "text-teal-400"
                } ml-1 text-[10px] block leading-3 mb-2`}
              >
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
                className={`placeholder:text-xs h-10  outline-none ring-1 w-full rounded-md p-1 text-sm ${
                  theme === "lightMode"
                    ? "group-focus:ring-orange-500 bg-slate-200 bg-opacity-20"
                    : "group-focus:ring-slate-100 bg-slate-800 text-white placeholder:text-slate-600"
                }`}
              />
            </div>
          </div>

          <div>
            {postRequestButtonState ? (
              <button
                className={` ${
                  theme === "lightMode" ? "bg-blue-950" : "bg-blue-500"
                } h-10 active:bg-green-500 p-2 w-full text-center text-white varela rounded-md`}
              >
                Submit request
              </button>
            ) : (
              <button
                disabled
                className="bg-gray-300 relative p-2 w-full h-10 text-center text-gray-300 varela rounded-md"
              >
                <div className="absolute left-[47.5%] w-[5%] aspect-square border-2 border-t-black border-b-gray-500 border-l-gray-500 border-r-gray-500 rounded-full animate-spin"></div>
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
