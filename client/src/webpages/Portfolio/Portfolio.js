import { useState } from "react";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import Fab from "@mui/material/Fab";

import Stocks from "./Stock";

import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Portfolio = () => {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/updateAssets/stock");
  };

  return (
    <Box margin="20px">
      <Header title="PORTFOLIO" />

      <Stocks />

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
