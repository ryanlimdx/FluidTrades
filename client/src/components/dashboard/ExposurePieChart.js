import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

const data = [
  {
    id: "SGD",
    label: "SGD",
    value: 2000,
    color: "hsl(21, 70%, 50%)",
  },
  {
    id: "USD",
    label: "USD",
    value: 583,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "BTC",
    label: "BTC",
    value: 450,
    color: "hsl(251, 70%, 50%)",
  },
  {
    id: "ETH",
    label: "ETH",
    value: 330,
    color: "hsl(303, 70%, 50%)",
  },
];

const ExposurePieChart = () => {
  return (
    <Card variant="outlined" sx={{ height: 45 + "vh" }}>
      <CardContent>
        <Typography align="left" sx={{ fontWeight: "bold" }}>
          Exposure Chart
        </Typography>
      </CardContent>

      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: -20,
            translateY: 0,
            itemsSpacing: 0,
            itemWidth: 200,
            itemHeight: 60,
            itemTextColor: "#999",
            itemDirection: "top-to-bottom",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </Card>
  );
};

export default ExposurePieChart;
