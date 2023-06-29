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
import FormLayout from "./layout/FormLayout";


export const UserAuthContext = React.createContext([]);

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<RootLayout />}>
            <Route path="/login" exact element={<ChakraProvider> <Login /> </ChakraProvider>} />
            <Route path="/register" exact element={<ChakraProvider> <Register /> </ChakraProvider>} />

           <Route element={<PrivateRoutes><MainLayout /></PrivateRoutes>}>
            <Route path="/dashboard" element={ <Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            
            <Route element={<ChakraProvider><FormLayout /></ChakraProvider>}>
              {/* Stock Form */}
              <Route path="/updateAssets/stock" element={<StockTransaction />} />
              <Route path="/updateAssets/stock/details" element={<StockDetails />} />
              <Route path="/updateAssets/stock/openingPosition" element={<OpeningPosition />} />
              <Route path="/updateAssets/stock/closingPosition" element={<ClosingPosition />} />
              <Route path="/updateAssets/stock/dividends" element={<Dividends />} />
              <Route path="/updateAssets/stock/confirmation" element={<StockConfirmation />} />

              {/* Currency Form */}
              <Route path="updateAssets/Currency" exact element={<CurrencyTransaction/>} />
              <Route path="updateAssets/Currency/Base" exact element={<CurrencyBase/>} />
              <Route path="updateAssets/Currency/ConvertTo" exact element={<ConvertTo/>} />          
              <Route path="updateAssets/Currency/Confirmation" exact element={<CurrencyConfirmation/>} />
            </Route>
            
          </Route> 

        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;
