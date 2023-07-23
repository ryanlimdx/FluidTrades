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
        <Typography align="left" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        {children}
      </Box>
    </Grid>
  );
};

const Dashboard = () => {
  return (
    <Box margin="20px">
      <Header title="DASHBOARD" />

      <Box
        sx={{
          display: "grid",
          height: "75vh",
          gridTemplateColumns: "repeat(9, 1fr)",
          gridTemplateRows: "1fr 1fr 1fr",
          gridTemplateAreas: `
          ". . . . . . riskExposure riskExposure riskExposure"
          ". . . . . . . . ."
          "performingAssets performingAssets performingAssets laggingAssets laggingAssets laggingAssets . . ."
          `,
          gap: 2,
        }}
      >
        <Box sx={{ gridArea: "riskExposure" }}>
          <ExposurePieChart />
        </Box>

        <Box sx={{ gridArea: "performingAssets" }}>
          <AssetsCard mode="performing" />
        </Box>

        <Box sx={{ gridArea: "laggingAssets" }}>
          <AssetsCard mode="lagging" />
        </Box>
      </Box>

    </Box>
  );
};

export default Dashboard;