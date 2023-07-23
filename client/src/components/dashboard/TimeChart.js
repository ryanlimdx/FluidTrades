import {
  Card,
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import {  useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import getChartData from "../../api/getChartData";

const TimeChart = () => {
  const [data, setData] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [updated, setUpdated] = useState(false);
  const [date, setDate] = useState("");

  async function fetchData(symbol) {
    try {
      const response = await getChartData(symbol.toUpperCase());
      const data = response.values;

      // Find the day of the first element
      const firstDay = data?.[0].datetime.slice(0, 10);

      // Throw error if data is not found
      if (firstDay === undefined) throw new Error("Data not found!")

      setDate(firstDay);
      // Filter elements with the same day
      const filteredData = data.filter(
        (item) => item.datetime.slice(0, 10) === firstDay
      );

      // Sort the filtered data in ascending order based on time
      const sortedData = filteredData.sort((a, b) =>
        a.datetime.localeCompare(b.datetime)
      );

      // Change field names "datetime" to "x" and "close" to "y"
      const renamedData = sortedData.map((item) => ({
        x: item.datetime.slice(11, 16),
        y: Number(item.close),
      }));

      setData([{ id: "chart", data: renamedData }]);
      setUpdated(true);
    } catch (error) {
      alert("Error fetching data. Please input a valid ticker.")
      console.error("Error fetching data:", error);
    }
  }

  const handleClick = async () => {
    fetchData(symbol);
  };

  return (
    <Card
      display="flex"
      flexDirection="column"
      sx={{ width: "100%", height: "400px", padding: "20px" }}
    >
      <Box>
        <Typography align="left" sx={{ fontWeight: "bold" }}>
          Time Chart
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
                <IconButton aria-label="search" onClick={handleClick}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {updated && <Typography> {symbol.toUpperCase()}'s chart on {date} </Typography>}
        
      </Box>
      <Box sx={{ width: "100%", height: "90%" }}>
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
          axisBottom={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: "time",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 2,
            tickPadding: 5,
            tickRotation: 0,
            legend: "price",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
        />
      </Box>
    </Card>
  );
};

export default TimeChart;
