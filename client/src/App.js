import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./state";
import { ChakraProvider } from "@chakra-ui/react";

import PrivateRoutes from "./navigation/PrivateRoutes";

// Layouts
import RootLayout from "./layout/RootLayout";
import MainLayout from "./layout/MainLayout";

// Webpages
import Login from "./webpages/Login";
import Register from "./webpages/Register";
import Dashboard from "./webpages/Dashboard";
import Profile from "./webpages/Profile"

// UpdateAssets form

// Stock
import StockTransaction from "./webpages/UpdateAssets/Stock/StockTransaction";
import StockDetails from "./webpages/UpdateAssets/Stock/StockDetails";
import OpeningPosition from "./webpages/UpdateAssets/Stock/OpeningPosition";
import ClosingPosition from "./webpages/UpdateAssets/Stock/ClosingPosition";
import Dividends from "./webpages/UpdateAssets/Stock/Dividends";
import StockConfirmation from "./webpages/UpdateAssets/Stock/Confirmation";

// Currency
import CurrencyTransaction from "./webpages/UpdateAssets/Currency/CurrencyTransaction";
import CurrencyBase from "./webpages/UpdateAssets/Currency/CurrencyBase";
import ConvertTo from "./webpages/UpdateAssets/Currency/ConvertTo";
import CurrencyConfirmation from "./webpages/UpdateAssets/Currency/Confirmation";


export const UserAuthContext = React.createContext([]);

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<RootLayout />}>
            <Route path="/login" exact element={<ChakraProvider> <Login /> </ChakraProvider>} />
            <Route path="/register" exact element={<ChakraProvider> <Register /> </ChakraProvider>} />

           <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<PrivateRoutes> <Dashboard /> </PrivateRoutes >} />
            <Route path="/profile" element={<PrivateRoutes> <Profile /> </PrivateRoutes >} />
            
          {/*
          // Stock Form
          <Route path="/updateAssets/Stock" element={<StockTransaction />} />
          <Route path="/updateAssets/Stock/Details" element={<StockDetails />} />
          <Route path="/updateAsse
          ts/Stock/OpeningPosition" element={<OpeningPosition />} />
          <Route path="/updateAssets/Stock/ClosingPosition" element={<ClosingPosition />} />
          <Route path="/updateAssets/Stock/Dividends" element={<Dividends />} />
          <Route path="/updateAssets/Stock/Confirmation" element={<StockConfirmation />} />

          // Currency Form
          <Route path="updateAssets/Currency" element={<CurrencyTransaction/>} />
          <Route path="updateAssets/Currency/Base" element={<CurrencyBase/>} />
          <Route path="updateAssets/Currency/ConvertTo" element={<ConvertTo/>} />          
          <Route path="updateAssets/Currency/Confirmation" element={<CurrencyConfirmation/>} /> */}
          </Route> 


          
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;
