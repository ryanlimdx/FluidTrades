import React from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";

// components
import AssetsCard from "../components/dashboard/AssetsCard";
import ExposurePieChart from "../components/dashboard/ExposurePieChart";
import History from "../components/dashboard/History";
import CurrencyCard from "../components/dashboard/CurrencyCard";
import TimeChart from "../components/dashboard/TimeChart";
import Networth from "../components/dashboard/Networth";
import Global from "../components/dashboard/GlobalCard";

const Dashboard = () => {
  return (
    <Box margin="20px">
      <Header title="DASHBOARD" />

      <Box
        height="75vh"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 1fr)",
          gridTemplateRows: "1fr 2fr 2fr",
          gridTemplateAreas: `
          "networth networth networth global global global riskExposure riskExposure riskExposure"
          "timechart timechart timechart timechart timechart timechart performingAssets performingAssets performingAssets"
          "history history history history history history currencycard currencycard currencycard"
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

        <Box sx={{ gridArea: "global" }}>
          <Global/>
        </Box>

        <Box sx={{ gridArea: "timechart" }}>
          <TimeChart />
        </Box>

        <Box sx={{ gridArea: "currencycard" }}>
          <CurrencyCard />
        </Box>

        <Box sx={{ gridArea: "history" }}>
          <History />
        </Box>

        <Box sx={{ gridArea: "networth" }}>
          <Networth />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
