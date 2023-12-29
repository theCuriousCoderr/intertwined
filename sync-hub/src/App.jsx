import React from "react";

import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing_page/LandingPage";
import ForgotPassword from "./pages/login_page/ForgotPassword";
import SignUp from "./pages/login_page/SignUp";
import Login from "./pages/login_page/Login";
import Home from "./pages/user/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/home" element={<Home />} />
    </Routes>
  );
}

export default App;
