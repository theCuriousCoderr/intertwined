import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./pages/landing_page/LandingPage";
import ForgotPassword from "./pages/login_page/ForgotPassword";
import SignUp from "./pages/login_page/SignUp";
import LogIn from "./pages/login_page/LogIn";
import Home from "./pages/user/Home";
import Test from "./pages/login_page/Test";
import ProfilePage from "./pages/user/user_screens/ProfilePage";
import AllRequests from "./pages/user/user_screens/AllRequests";
import YourRequests from "./pages/user/user_screens/YourRequests";
import AddRequest from "./pages/user/user_screens/AddRequest";
import Messages from "./pages/user/user_screens/Messages";
import Alerts from "./pages/user/user_screens/Alerts";
import FootNavBar from "./components/FootNavBar";
import SideNavBar from "./components/SideNavBar";
import getHook from "./apiHooks/getHook";
import { DarkMode, LightModeOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import SettingsPage from "./pages/user/user_screens/SettingsPage";
import ComplaintsPage from "./pages/user/user_screens/ComplaintsPage";
let dotEnv = import.meta.env;

function App() {
  const [user, setUser] = useState("");
  const [navItem, setNavItem] = useState("allRequests");
  const [allRequestsCache, setAllRequestsCache] = useState("");
  const [showSideNavBar, setShowSideNavBar] = useState(false);
  const [clientContent, setClientContent] = useState("");
  const [newMessage, setNewMessage] = useState(false);
  const [sendersList, setSendersList] = useState([]);
  const [sideNavBarExtend, setSideNavBarExtend] = useState("");
  const [theme, setTheme] = useState("lightMode");
  const navigate = useNavigate();

  let baseURL;
  if (dotEnv.MODE === "development") {
    baseURL = dotEnv.VITE_DEV_URL;
  } else {
    baseURL = dotEnv.VITE_PROD_URL;
  }

  useEffect(() => {
    setClientContent("");
    async function verifyUser() {
      let token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      }
      token = JSON.parse(token);
      try {
        let url = baseURL + "/user/home";
        let response = await getHook(url, true);

        if (response.success) {
          setUser(response.success);
          navigate("/user/all-requests");
        } else {
          setUser("Error");
        }
      } catch (error) {
        console.log(error);
      }
    }
    user === "" && verifyUser();
  }, [user]);

  function removeSender(param = "") {
    if (param !== "") {
      let newList = sendersList.filter((item) => item !== param);
      setSendersList(newList);
    }
  }

  return (
    <div className="bg-red-30">
      {user.email && (
        <div className="bg-red-40 absolute z-20">
          {sideNavBarExtend !== "" && (
            <div
              onClick={() => setSideNavBarExtend("")}
              className="absolute bg-white z-50 h-full w-full slideInLeft"
            >
              {sideNavBarExtend === "profile" && (
                <ProfilePage
                  user={user}
                  setUser={setUser}
                  setSideNavBarExtend={setSideNavBarExtend}
                />
              )}
            </div>
          )}
          <div className="relative h-scree w-full">
            <div
              className={`fixed top-0 w-full flex flex-wrap justify-between items-center p-2 ${
                theme === "lightMode"
                  ? "bg-gray-500 bg-opacity-40"
                  : "bg-gray-500 bg-opacity-40"
              } `}
            >
              <div
                onClick={() => setShowSideNavBar(true)}
                className="size-10 flex items-center justify-center rounded-full bg-red-200"
              >
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt="User Photo"
                    className="border-2 border-slate-100 w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Avatar />
                )}
              </div>
              <p
                className={`text-lg varela font-semibold ${
                  theme === "lightMode" ? "text-white" : "text-white"
                }`}
              >
                intertwined
              </p>
              {theme === "lightMode" ? (
                <div
                  onClick={() => setTheme("darkMode")}
                  className="mr-1 size-5 rounded-full flex items-center justify-center"
                >
                  <DarkMode />
                </div>
              ) : (
                <div
                  onClick={() => setTheme("lightMode")}
                  className="mr-1 size-5 bg-yellow-20 flex items-center justify-center text-yellow-500"
                >
                  <LightModeOutlined />
                </div>
              )}
            </div>

            {showSideNavBar && (
              <SideNavBar
                user={user}
                setUser={setUser}
                setShowSideNavBar={setShowSideNavBar}
                setSideNavBarExtend={setSideNavBarExtend}
                theme={theme}
              />
            )}
          </div>
        </div>
      )}

      {!(
        ["/", "/signup", "/login", "/forgot-password"].includes(
          window.location.pathname
        ) || showSideNavBar
      ) && (
        <FootNavBar
          navItem={navItem}
          setNavItem={setNavItem}
          newMessage={newMessage}
          sendersList={sendersList}
          theme={theme}
        />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/user/home"
          element={
            <Home
              user={user}
              setUser={setUser}
              theme={theme}
              navItem={navItem}
              setNavItem={setNavItem}
              showSideNavBar={showSideNavBar}
              setShowSideNavBar={setShowSideNavBar}
              newMessage={newMessage}
              sendersList={sendersList}
              setSendersList={setSendersList}
              sideNavBarExtend={sideNavBarExtend}
              setSideNavBarExtend={setSideNavBarExtend}
              setClientContent={setClientContent}
            />
          }
        />
        <Route
          path="/user/all-requests"
          element={
            <AllRequests
              user={user}
              allRequestsCache={allRequestsCache}
              setAllRequestsCache={setAllRequestsCache}
              setClientContent={setClientContent}
              setNavItem={setNavItem}
              theme={theme}
            />
          }
        />
        <Route
          path="/user/your-requests"
          element={
            <YourRequests
              user={user}
              allRequestsCache={allRequestsCache}
              setAllRequestsCache={setAllRequestsCache}
              theme={theme}
            />
          }
        />
        <Route
          path="/user/add-request"
          element={
            <AddRequest
              user={user}
              theme={theme}
              setAllRequestsCache={setAllRequestsCache}
            />
          }
        />
        <Route
          path="/user/messages"
          element={
            <Messages
              clientContent={clientContent}
              setClientContent={setClientContent}
              user={user}
              setNewMessage={setNewMessage}
              sendersList={sendersList}
              removeSender={removeSender}
              theme={theme}
            />
          }
        />
        <Route path="/user/alerts" element={<Alerts theme={theme} />} />
        <Route path="/test" element={<Test />} />
        <Route
          path="/profile"
          element={<ProfilePage user={user} setUser={setUser} theme={theme} />}
        />
        <Route
          path="/settings"
          element={<SettingsPage user={user} setUser={setUser} theme={theme} />}
        />
        <Route
          path="/complaints"
          element={
            <ComplaintsPage user={user} setUser={setUser} theme={theme} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
