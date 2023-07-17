import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/state";
import { ChakraProvider } from "@chakra-ui/react";

// Components
import PrivateRoutes from "./navigation/PrivateRoutes";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

// Theme
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

// Layouts
import MainLayout from "./layout/MainLayout";
import FormLayout from "./layout/FormLayout";

// Webpages
import Login from "./webpages/Login";
import Register from "./webpages/Register";
import Dashboard from "./webpages/Dashboard";
import Profile from "./webpages/Profile";
import Transactions from "./webpages/Transactions/Transactions";
import Portfolio from "./webpages/Portfolio/Portfolio";

// Forms
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
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <AppProvider>
              <Routes>
                <Route path="/">
                  <Route path="/login" element={ <ChakraProvider><Login /></ChakraProvider> } />
                  <Route path="/register" element={ <ChakraProvider><Register /></ChakraProvider> } />

                  <Route element={ <PrivateRoutes><MainLayout/></PrivateRoutes> } >
                    <Route>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/transactions" element={<Transactions />} />
                      <Route path="/portfolio" element={<Portfolio />} />

                      <Route element={ <ChakraProvider><FormLayout /></ChakraProvider> } >
                        {/* Stock Form */}
                        <Route path="/updateAssets/stock" element={<StockTransaction />} />
                        <Route path="/updateAssets/stock/details" element={<StockDetails />} />
                        <Route path="/updateAssets/stock/openingPosition" element={<OpeningPosition />} />
                        <Route path="/updateAssets/stock/closingPosition" element={<ClosingPosition />} />
                        <Route path="/updateAssets/stock/dividends" element={<Dividends />} />
                        <Route path="/updateAssets/stock/confirmation" element={<StockConfirmation />} />

                        {/* Currency Form */}
                        <Route path="updateAssets/currency" element={<CurrencyTransaction />} />
                        <Route path="updateAssets/currency/base" element={<CurrencyBase />} />
                        <Route path="updateAssets/currency/convertTo" element={<ConvertTo />} />
                        <Route path="updateAssets/currency/confirmation" element={<CurrencyConfirmation />} />
                      </Route>
                    </Route>

                  </Route>
                </Route>
              </Routes>
            </AppProvider>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
