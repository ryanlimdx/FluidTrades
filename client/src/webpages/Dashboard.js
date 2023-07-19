import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Header from "../components/Header";

// components
import PerformingAssets from "../components/dashboard/PerformingAssets";
import LaggingAssets from "../components/dashboard/LaggingAssets";
import ExposurePieChart from "../components/dashboard/ExposurePieChart";
import RealTimeSearch from "../components/dashboard/RealTimeSearch";
import StockTransactions from "./Transactions/StockTransactions";
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
        {/* <Grid item xs={4}>
          <Box borderRadius="10px" padding="5px">
            <Typography>
              CurrencyTransactions
            </Typography>
            <CurrencyTransactions />
          </Box>
          
        </Grid> */}
        <GridItem columns="12" title="Currency Transaction">
          {/* to simplify the component to remove the datagrid  */}
          <CurrencyTransactions />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard;
