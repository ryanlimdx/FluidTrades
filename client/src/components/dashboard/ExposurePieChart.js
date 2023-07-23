import React, { useState, useEffect } from "react";
import { Typography, Card, Box, useTheme } from "@mui/material";
import { themeSettings } from "../../theme";
import { ResponsivePie } from "@nivo/pie";
import axios from "../../api/axios";

import CircleIcon from '@mui/icons-material/Circle';

const ExposurePieChart = () => {
  const [data, setData] = useState([]);

  const theme = useTheme();
  const themeColors = themeSettings(theme.palette.mode).palette;
  const cardColors = themeColors.card;

  useEffect(() => {
    axios
      .get("/dashboard/exposure")
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Card
      display="flex"
      flexDirection="column"
      sx={{
        width: "100%",
        height: "100%",
        padding: "20px",
        backgroundColor: cardColors.background,
      }}
    >
      <Box>
        <Typography align="left" sx={{ fontWeight: "bold" }}>
          RISK EXPOSURE
        </Typography>
        {data.length === 0 ? (
          <Typography> You currently have no assets. </Typography>
        ) : null}
      </Box>
      <Box sx={{ width: "100%", height: "90%" }}>
        <ResponsivePie
          data={data}
          // margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
          tooltip={(e) => {
            let { datum: pieData } = e;
            return (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ padding: "10px", backgroundColor: cardColors.main, borderRadius: "6px"}}
              >
                <Box display="flex">
                  <CircleIcon sx={{color: pieData.color, marginRight: "10px"}}/>
                  <Typography>{pieData.id}</Typography>
                </Box>
                
                <Typography mt="2px">Invested Capital: ${pieData.value}</Typography>
              </Box>
            );
          }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ scheme: "set3" }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={cardColors.text}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={cardColors.text}
          arcLabelsSkipAngle={10}
          // arcLabelsTextColor={cardColors.text}
        />
      </Box>
    </Card>
  );
};

export default ExposurePieChart;
