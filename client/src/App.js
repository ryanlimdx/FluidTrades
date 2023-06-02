import React from "react";
import { Routes, Route } from 'react-router-dom';

import RootLayout from "./layout/RootLayout";

import Login from "./webpages/Login";
import Register from "./webpages/Register";

import PrivateRoutes from "./navigation/PrivateRoutes";
import Homepage from "./webpages/Homepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />} >

        <Route path="login" element= {<Login /> } />
        <Route path="register" element= {<Register />} />

        <Route element={<PrivateRoutes />}>
          <Route path="homepage" element= {<Homepage />} exact/>
        </Route>

      </Route>
    </Routes>
  );
}

export default App; 