import { Typography, Box, useTheme, Skeleton } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";
import { themeSettings } from "../../theme";
import getChartData from "../../api/getChartData";

const MarketChart = ({ symbol, loading }) => {
  const theme = useTheme();
  const themeColors = themeSettings(theme.palette.mode).palette;
  const cardColors = themeColors.card;

  const [chartData, setChartData] = useState([]);
  const [isLoading, setLoading] = useState(loading);
  const [isError, setError] = useState("");

  useEffect(() => {
    fetchChartData(symbol);
  }, [symbol]);

  async function fetchChartData(symbol) {
    try {
      const response = await getChartData(symbol.toUpperCase());
      const data = response.values;
      data.forEach((item) => {
        item.x = item.datetime;
        item.y = item.close;
      });

      data.reverse();
      setChartData([{ id: "chart", data: data }]);
      setLoading(false);
    } catch (error) {
      // alert("Error fetching data. Please input a valid ticker.");
      if (error.message === "Request failed with status code 429") {
        setError("API limit exceeded");
      } else {
        setError("Please input a valid ticker!");
      }
      console.error("Error fetching data:", error);
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ width: "100%", height: "100%" }}
    >
      {isLoading ? (
        <Skeleton variation="rectangular" width="100%" height="100%" />
      ) : isError ? (
        <Typography>{isError}</Typography>
      ) : (
        <ResponsiveLine
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={null}
          enableGridX={false}
          enableGridY={false}
          pointSize={5}
          pointColor={{ theme: "background" }}
          pointBorderWidth={1}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          tooltip={({ point }) => {
            return (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{
                  padding: "10px",
                  backgroundColor: cardColors.main,
                  borderRadius: "6px",
                }}
              >
                <Typography>Date : {point.data.x}</Typography>
                <Typography mt="2px">
                  Price: ${point.data.y.toFixed(2)}
                </Typography>
              </Box>
            );
          }}
        />
      )}
    </Box>
  );
};

export default MarketChart;
