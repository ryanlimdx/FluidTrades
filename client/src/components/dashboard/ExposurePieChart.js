import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, Box, useTheme} from "@mui/material";
import { themeSettings, tokens } from "../../theme";
import { ResponsivePie } from "@nivo/pie";
import axios from "../../api/axios";
import { bgcolor } from "@mui/system";

const ExposurePieChart = () => {
  const [data, setData] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
      sx={{ width: "100%", height: "100%", padding: "20px", backgroundColor: cardColors.background }}
    >
      <Box>
        <Typography align="left" sx={{ fontWeight: "bold" }}>
          RISK EXPOSURE
        </Typography>
        {data.length === 0 ? (
          <Typography> You currently have no assets. </Typography>
        ) : null}
      </Box>
      <Box sx={{ width: "100%", height: "90%",}}>
        <ResponsivePie
          data={data}
          // margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
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
