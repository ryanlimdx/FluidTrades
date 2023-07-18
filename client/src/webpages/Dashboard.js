import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Header from "../components/Header";

// components
import PerformingAssets from "../components/dashboard/PerformingAssets";
import LaggingAssets from "../components/dashboard/LaggingAssets";
import ExposurePieChart from "../components/dashboard/ExposurePieChart";
import RealTimeSearch from "../components/dashboard/RealTimeSearch";
import StockTransactions from "./Transactions/StockTransactions";
import CurrencyTransactions from "./Transactions/CurrencyTransactions";

const Dashboard = () => {
  return (
    <Box margin="20px">
      <Header title="DASHBOARD" />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <PerformingAssets />
        </Grid>
        <Grid item xs={4}>
          <LaggingAssets />
        </Grid>

        <Grid item xs={4}>
          <RealTimeSearch />
        </Grid>

        <Grid item xs={4}>
          <ExposurePieChart />
        </Grid>

        <Grid item xs={4}>
          <StockTransactions />
        </Grid>
        <Grid item xs={4}>
          <Box borderRadius="10px">
            <Typography>
              CurrencyTransactions
            </Typography>
            <CurrencyTransactions />
          </Box>
          
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
