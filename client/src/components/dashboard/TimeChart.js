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
import { themeSettings } from "../../theme";
import getChartData from "../../api/getChartData";

import SearchIcon from "@mui/icons-material/Search";

const TimeChart = () => {
  const theme = useTheme();
  const themeColors = themeSettings(theme.palette.mode).palette;
  const cardColors = themeColors.card;

  const [data, setData] = useState([]);
  const [symbol, setSymbol] = useState("SPY"); // default to S&P500
  const [updated, setUpdated] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchData(symbol);
  }, []);

  async function fetchData(symbol) {
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
        item.x = item.datetime
        item.y = item.close
      })

      data.reverse();

      setData([{ id: "chart", data: data }]);
      setUpdated(true);
    } catch (error) {
      alert("Error fetching data. Please input a valid ticker.");
      console.error("Error fetching data:", error);
    }
  }

  const handleClick = async () => {
    fetchData(symbol);
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
        <Typography sx={{ fontWeight: "bold" }} marginLeft="10px">
          SEARCH
        </Typography>
        <TextField
          id="outlined-basic"
          label="Ticker"
          size="small"
          onChange={(event) => {
            setUpdated(false);
            setSymbol(event.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="search"
                  onClick={handleClick}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mt: "20px" }}
        />
        {updated && (
          <Typography>
            {symbol.toUpperCase()}'s chart on {date}{" "}
          </Typography>
        )}

        <Box sx={{ width: "100%", height: "50%" }}>
          <ResponsiveLine
            data={data}
            margin={{ top: 7, right: 50, bottom: 50, left: 50 }}
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
                  <Typography mt="2px">Price: ${point.data.y.toFixed(2)}</Typography>
                </Box>
              );
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TimeChart;
