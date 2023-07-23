import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import axios from "../../api/axios";

const ExposurePieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/dashboard/exposure")
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Card variant="outlined" sx={{height: "40vh"}}>
      <CardContent>
        <Typography align="left" sx={{ fontWeight: "bold" }}>
          Exposure Chart
        </Typography>
        {data.length === 0 ? <Typography> You have no stocks currently. </Typography> : null}
      </CardContent>
      <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ scheme: "yellow_green_blue" }}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#777"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
        />
    </Card>
  );
};

export default ExposurePieChart;