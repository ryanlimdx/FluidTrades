import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Grid } from "@mui/material";
import Header from "../../components/Header";
import FloatingTool from "../../components/FloatingTool";

import Assets from "./Assets";
import Currency from "./Currency";

import AddIcon from "@mui/icons-material/Add";
import FAB from "../../components/FloatingTool";

const Portfolio = () => {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/updateAssets/stock");
  };

  return (
    <Box margin="20px">
      <Header title="PORTFOLIO" />

      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Assets/>
        </Grid>
        <Grid item xs={3}>
          <Currency/>
        </Grid>
      </Grid>

    <FloatingTool/>
    </Box>
  );
};

export default Portfolio;
