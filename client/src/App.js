import React from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import PrivateRoutes from "./navigation/PrivateRoutes";
import { AppProvider } from "./state";

// Webpages
import Login from "./webpages/Login";
import Register from "./webpages/Register";
import Homepage from "./webpages/Homepage";

// UpdateAssets form
import TransactionDetails from "./webpages/UpdateAssets/TransactionDetails";
import OpeningPosition from "./webpages/UpdateAssets/OpeningPosition";
import ClosingPosition from "./webpages/UpdateAssets/ClosingPosition";
import Dividends from "./webpages/UpdateAssets/Dividends";
import Confirmation from "./webpages/UpdateAssets/Confirmation";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/homepage" exact element={<Homepage />} />

          <Route path="/updateAssets" element={<TransactionDetails />} />
          <Route path="/updateAssets/OpeningPosition" element={<OpeningPosition />} />
          <Route path="/updateAssets/ClosingPosition" element={<ClosingPosition />} />
          <Route path="/updateAssets/Dividends" element={<Dividends />} />
          <Route path="/updateAssets/Confirmation" element={<Confirmation />} />

          {/**
           * <Route element={<PrivateRoutes />}>
           *  <Route path="/homepage" exact element= {<Homepage />}/>
           * </Route>
           */}
        </Route>
      </Routes>
    </AppProvider>
    
  );
}

export default App;
