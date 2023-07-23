import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Header from "../components/Header";

// components
import AssetsCard from "../components/dashboard/AssetsCard";
import ExposurePieChart from "../components/dashboard/ExposurePieChart";
import RealTimeSearch from "../components/dashboard/RealTimeSearch";
import History from "../components/dashboard/History";

const Dashboard = () => {
  return (
    <Box margin="20px">
      <Header title="DASHBOARD" />

      <Box
        sx={{
          display: "grid",
          height: "80vh",
          gridTemplateColumns: "repeat(9, 1fr)",
          gridTemplateRows: "1fr 1fr 1fr",
          gridTemplateAreas: `
          "performingAssets performingAssets performingAssets laggingAssets laggingAssets laggingAssets riskExposure riskExposure riskExposure"
          ". . . . . . . . ."
          " history history history history history history . . ."
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

        <Box sx={{ gridArea: "history" }}>
          <History />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
