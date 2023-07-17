import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Grid } from "@mui/material";
import Header from "../../components/Header";
import Fab from "@mui/material/Fab";

import Assets from "./Assets";
import Currency from "./Currency";

import AddIcon from "@mui/icons-material/Add";

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

      <Fab
        onClick={handleAdd}
        sx={{
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',}
        }
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Portfolio;
