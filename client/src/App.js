import React from "react";
import { Routes, Route } from 'react-router-dom';

import AppLayout from "./layout/RootLayout";

import Login from "./webpages/Login";
import Register from "./webpages/Register";

function App() {
  return (
    <Routes>
      <Route path ="/" element={<AppLayout />} >

        <Route path="login" element= {<Login /> } />
        <Route path="register" element= {<Register />} />

      </Route>
    </Routes>
  );
}

export default App; 