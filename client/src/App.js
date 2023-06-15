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

// Stock
import StockTransaction from "./webpages/UpdateAssets/Stock/StockTransaction";
import StockDetails from "./webpages/UpdateAssets/Stock/StockDetails";
import OpeningPosition from "./webpages/UpdateAssets/Stock/OpeningPosition";
import ClosingPosition from "./webpages/UpdateAssets/Stock/ClosingPosition";
import Dividends from "./webpages/UpdateAssets/Stock/Dividends";

// Currency

// Confirmation
import Confirmation from "./webpages/UpdateAssets/Stock/Confirmation";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/homepage" exact element={<Homepage />} />
          // Stock Form
          <Route path="/updateAssets/Stock" element={<StockTransaction />} />
          <Route path="/updateAssets/Stock/Details" element={<StockDetails />} />
          <Route path="/updateAssets/Stock/OpeningPosition" element={<OpeningPosition />} />
          <Route path="/updateAssets/Stock/ClosingPosition" element={<ClosingPosition />} />
          <Route path="/updateAssets/Stock/Dividends" element={<Dividends />} />
          <Route path="/updateAssets/Stock/Confirmation" element={<Confirmation />} />
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
