import { Box, Grid } from "@mui/material";
import Header from "../../components/Header";
import FloatingTool from "../../components/FloatingTool";

import Assets from "./Assets";
import Currency from "./Currency";

const Portfolio = () => {
  return (
    <Box margin="20px">
      <Header title="PORTFOLIO" />

      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Assets margin="20px 0 0 0" height="75vh" />
        </Grid>
        <Grid item xs={3}>
          <Currency margin="20px 0 0 0"/>
        </Grid>
      </Grid>

      <FloatingTool />
    </Box>
  );
};

export default Portfolio;
