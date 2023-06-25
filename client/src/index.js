import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Route, Routes } from "react-router-dom";
import { UserAuthProvider } from "./context/UserAuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <UserAuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </UserAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
