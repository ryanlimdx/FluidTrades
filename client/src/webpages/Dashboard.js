import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Header from "../components/Header";

// components
import AssetsCard from "../components/dashboard/AssetsCard";
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
          <AssetsCard mode="performing" />
        </Grid>
        <Grid item xs={4}>
          <AssetsCard mode="lagging" />
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
        {/* <Grid item xs={4}>
          <Box borderRadius="10px" padding="5px">
            <Typography>
              CurrencyTransactions
            </Typography>
            <CurrencyTransactions />
          </Box>
          
        </Grid> */}
        <GridItem columns={12} title="CURRENCY TRANSACTION">
          {/* to simplify the component to remove the datagrid  */}
          <CurrencyTransactions />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard;