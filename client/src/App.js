import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/state";
import { ChakraProvider } from "@chakra-ui/react";

// Components
import PrivateRoutes from "./navigation/PrivateRoutes";

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
import StockTransaction from "./webpages/UpdateAssets/Stock/TransactionType";
import StockDetails from "./webpages/UpdateAssets/Stock/StockDetails";
import TransactionDetails from "./webpages/UpdateAssets/Stock/TransactionDetails";
import StockConfirmation from "./webpages/UpdateAssets/Stock/Confirmation";

// Currency
import CurrencyTransaction from "./webpages/UpdateAssets/Currency/TransactionType";
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

                      <Route element={<FormLayout />} >
                        {/* Stock Form */}
                        <Route path="/update-assets/stock" element={<StockTransaction />} />
                        <Route path="/update-assets/stock/details" element={<StockDetails />} />
                        <Route path="/update-assets/stock/transaction-details" element={<TransactionDetails />} />
                        <Route path="/update-assets/stock/confirmation" element={<StockConfirmation />} />

                        {/* Currency Form */}
                        <Route path="update-assets/currency" element={<CurrencyTransaction />} />
                        <Route path="update-assets/currency/base" element={<CurrencyBase />} />
                        <Route path="update-assets/currency/convertTo" element={<ConvertTo />} />
                        <Route path="update-assets/currency/confirmation" element={<CurrencyConfirmation />} />
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
