import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";
import { themeSettings, tokens } from "../../theme";
import getChartData from "../../api/getChartData";
import Marquee from "react-fast-marquee";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const TimeChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const themeColors = themeSettings(theme.palette.mode).palette;
  const cardColors = themeColors.card;

  const [search, setSearch] = useState(false);
  const [symbol, setSymbol] = useState("SPY"); // default to S&P500
  const [chartData, setChartData] = useState([]);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetchChartData(symbol);
  }, []);

  async function fetchChartData(symbol) {
    try {
      const response = await getChartData(symbol.toUpperCase());
      const data = response.values;

      // // Find the day of the first element
      // const firstDay = data?.[0].datetime.slice(0, 10);

      // // Throw error if data is not found
      // if (firstDay === undefined) throw new Error("Data not found!");

      // setDate(firstDay);
      // // Filter elements with the same day
      // const filteredData = data.filter(
      //   (item) => item.datetime.slice(0, 10) === firstDay
      // );

      // // Sort the filtered data in ascending order based on time
      // const sortedData = filteredData.sort((a, b) =>
      //   a.datetime.localeCompare(b.datetime)
      // );

      // // Change field names "datetime" to "x" and "close" to "y"
      // const renamedData = sortedData.map((item) => ({
      //   x: item.datetime.slice(11, 16),
      //   y: Number(item.close),
      // }));

      data.forEach((item) => {
        item.x = item.datetime;
        item.y = item.close;
      });

      setStockData(data);
      data.reverse();
      setChartData([{ id: "chart", data: data }]);
    } catch (error) {
      alert("Error fetching data. Please input a valid ticker.");
      console.error("Error fetching data:", error);
    }
  }

  const handleSearch = async () => {
    fetchChartData(symbol);
    setSearch(!search);
  };

  const handleStartSearch = () => {
    setSearch(!search);
  };

  return (
    <Card
      display="flex"
      // flexDirection="column"
      sx={{
        width: "100%",
        height: "27vh",
        padding: "20px",
        backgroundColor: cardColors.background,
      }}
    >
      <CardContent sx={{ width: "100%", height: "100%" }}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography sx={{ fontWeight: "bold" }}>SEARCH</Typography>

          {search ? (
            <TextField
              id="outlined-basic"
              label="Ticker"
              size="small"
              onChange={(event) => {
                setSymbol(event.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      aria-label="search"
                      onClick={handleSearch}
                    >
                      <SearchIcon />
                    </IconButton>

                    <Box>
                      <IconButton
                        size="small"
                        aria-label="close search"
                        onClick={handleStartSearch}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            <Box display="flex" alignItems="center">
              <Typography mr="20px">
                {symbol.toUpperCase()}: Daily Chart
              </Typography>
              <IconButton
                size="small"
                aria-label="search"
                onClick={handleStartSearch}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "75%",
            borderRadius: "6px",
            marginTop: "20px",
          }}
        >
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

          <Marquee pauseOnClick={true} pauseOnHover={true}>
            {stockData.map((data) => {
              return (
                <Box display="flex" key={data.datetime}>
                  <Typography
                    mr="10px"
                    ml="20px"
                    sx={{ fontWeight: "bold", color: colors.grey[300] }}
                  >
                    {data.datetime}{" "}
                  </Typography>
                  <Typography sx={{ color: colors.grey[300] }}>
                    Open: {parseFloat(data.open).toFixed(2)} {"   "}
                    Close: {parseFloat(data.close).toFixed(2)} {"   "}
                    Day's High: {parseFloat(data.high).toFixed(2)} {"   "}
                    Day's Low: {parseFloat(data.low).toFixed(2)} {"   "}
                    Volume: {data.volume} {"   "}
                  </Typography>
                </Box>
              );
            })}
          </Marquee>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TimeChart;
