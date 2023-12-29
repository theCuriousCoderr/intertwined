import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getHook from "../../apiHooks/getHook";
import FootNavBar from "../../components/FootNavBar";
import SideNavBar from "../../components/SideNavBar";
import AllRequests from "./user_screens/AllRequests";
import YourRequests from "./user_screens/YourRequests";
import AddRequest from "./user_screens/AddRequest";
import Messages from "./user_screens/Messages";
import Alerts from "./user_screens/Alerts";
import io from "socket.io-client";
import ProfilePage from "./user_screens/ProfilePage";
let dotEnv = import.meta.env;

let baseURL;
if (dotEnv.MODE === "development") {
  baseURL = dotEnv.VITE_DEV_URL
} else {
  baseURL = dotEnv.VITE_PROD_URL
}

const socket = io.connect(baseURL);

function Home() {
  const [user, setUser] = useState("");
  const [navItem, setNavItem] = useState("allRequests");
  const [showSideNavBar, setShowSideNavBar] = useState(false);
  const [clientContent, setClientContent] = useState("");
  const [newMessage, setNewMessage] = useState(false);
  const [sendersList, setSendersList] = useState([]);
  const [sideNavBarExtend, setSideNavBarExtend] = useState("")
  const navigate = useNavigate();


  useEffect(() => {
    setClientContent("");
    async function verifyUser() {
      let token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      token = JSON.parse(token);
      try {
        let url = baseURL + "/user/home";
        let response = await getHook(url, true);
        if (response.success) {
          setUser(response.success);
        } else {
          setUser("Error");
        }
      } catch (error) {
        console.log(error);
      }
    }
    user === "" && verifyUser();
  }, [navItem, newMessage]);

  socket.on("receive", (data) => {
    let res = data.message;
    if (
      (res[2] === user.email && res[1] === clientContent.reqShaker) ||
      (res[1] === user.email && res[2] === clientContent.reqShaker)
    ) {
      let sender = res[0].filter((item) => item.id !== user.email);
      if (sender.length >= 1) {
        let newList = [...sendersList];
        newList.push(sender[0].id);
        setSendersList(newList);
        setNewMessage(true);
      }
    }
  });

  function removeSender(param = "") {
    if (param !== "") {
      let newList = sendersList.filter((item) => item !== param);
      setSendersList(newList);
    }
  }

  return (
    <div>
      {user === "" && (
        <div className="h-full w-full bg-red-5 absolute flex items-center p-3">
          <div className="relative h-1 w-full rounded-full bg-slate-300 overflow-hidden">
            <div className="progress left-right  h-full rounded-full w-full bg-pink-600"></div>
          </div>
        </div>
      )}
      {user === "Error" && (
        <div className="flex items-center justify-center flex-col h-screen">
          <p className="font-medium text-red-600">Unauthorized Access!</p>
          <div className="bg-gray-400 w-36 h-5"></div>
          <div className=""></div>
          <p className="text-lg font-medium">
            Back to{" "}
            <button
              onClick={() => navigate("/login")}
              className="underline underline-offset-1 text-blue-700 active:text-green-500"
            >
              Log In
            </button>
          </p>
        </div>
      )}

      {user.email && (
        <div>
          { sideNavBarExtend !== "" && 
          <div onClick={()=> setSideNavBarExtend("")} className="absolute bg-white z-50 h-full w-full slideInLeft">
            {sideNavBarExtend === "profile" && <ProfilePage user={user} />}
            </div>}
          <div className="relative h-screen w-full bg-red-20">
            <div className="fixed top-0 w-full flex flex-wrap justify-between items-center p-2 bg-white">
              <div
                onClick={() => setShowSideNavBar(true)}
                className="size-10 flex items-center justify-center rounded-full bg-red-200"
              >
                <img
                  src={user.photo}
                  alt="User Photo"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <p className="text-lg varela font-semibold">intertwined</p>
              <div className="size-5 bg-yellow-200"></div>
            </div>

            {showSideNavBar && (
              <SideNavBar user={user} setShowSideNavBar={setShowSideNavBar} setSideNavBarExtend={setSideNavBarExtend} />
            )}

            <div className="absolute bg-red-40 bottom-14 w-full overflow-scroll top-14">
              {navItem === "allRequests" && (
                <AllRequests
                  user={user}
                  setClientContent={setClientContent}
                  setNavItem={setNavItem}
                />
              )}
              {navItem === "yourRequests" && <YourRequests />}
              {navItem === "addRequest" && <AddRequest user={user} />}
              {navItem === "messages" && (
                <Messages
                  clientContent={clientContent}
                  socket={socket}
                  user={user}
                  setNewMessage={setNewMessage}
                  sendersList={sendersList}
                  removeSender={removeSender}
                />
              )}
              {navItem === "alerts" && <Alerts />}
            </div>

            <FootNavBar
              navItem={navItem}
              setNavItem={setNavItem}
              newMessage={newMessage}
              sendersList={sendersList}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
