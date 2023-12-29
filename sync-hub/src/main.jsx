import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
let dotEnv = import.meta.env;

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={dotEnv.VITE_GOOGLE_SSO_CLIENT_ID}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
