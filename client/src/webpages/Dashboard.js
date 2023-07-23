import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Header from "../components/Header";

// components
import PerformingAssets from "../components/dashboard/PerformingAssets";
import LaggingAssets from "../components/dashboard/LaggingAssets";
import ExposurePieChart from "../components/dashboard/ExposurePieChart";
import RealTimeSearch from "../components/dashboard/RealTimeSearch";
import AssetTransactions from "./Transactions/AssetTransactions";
import CurrencyTransactions from "./Transactions/CurrencyTransactions";

const GridItem = ({ columns, title, children }) => {
  return (
    <Grid item xs={columns}>
      <Box borderRadius="10px" padding="5px">
        <Typography align="left" sx={{ fontWeight: "bold" }}>{title}</Typography>
        {children}
      </Box>
    </Grid>
  );
};

const Dashboard = () => {
  return (
    <Box margin="20px">
      <Header title="DASHBOARD" />
      <Grid container spacing={2} height="75vh">
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
          <AssetTransactions />
        </Grid>

        <GridItem columns={12} title="CURRENCY TRANSACTION">
          <CurrencyTransactions />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard;
