import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Stack, Grid } from "@mui/material";

// components
import PerformingAssets from "../components/dashboard/PerformingAssets";
import LaggingAssets from "../components/dashboard/LaggingAssets";
import ExposurePieChart from "../components/dashboard/ExposurePieChart";
import RealTimeSearch from "../components/dashboard/RealTimeSearch";

const Dashboard = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper
            sx={{
              background: "white",
              textAlign: "left",
            }}
            elevation={0}
          >
            <Typography variant="h4" color="#7E909A">
              DASHBOARD
            </Typography>
          </Paper>

          <Stack direction="row" spacing={2} marginTop={2}>
            <PerformingAssets />
            <LaggingAssets />
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <RealTimeSearch />
        </Grid>
      </Grid>

      <Grid container spacing={2} py={2}>
        <Grid item xs={8}>
          <ExposurePieChart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
