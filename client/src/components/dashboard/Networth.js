import { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  useTheme,
} from "@mui/material";
import { themeSettings, tokens } from "../../theme";
import axios from "../../api/axios";

const Networth = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const themeColors = themeSettings(theme.palette.mode).palette;
  const cardColors = themeColors.card;

  const [data, setData] = useState([]);

  useEffect(() => {
    // async function fetchAndExtract() {
    //     try {
    //         const response = await axios.get("/portfolio/assets");
    //         const data = response.data;
    //     }
    // }
    axios
      .get("/portfolio/assets")
      .then((response) => {
        var overallData = [];

        var networth = 0;
        var totalInvested = 0;
        response.data.forEach((asset) => {
            totalInvested += asset.investedCapital
            if (asset.marketValue !== "API limit exceeded" && asset.marketValue) {
                networth += asset.marketValue;
            }
        })
        overallData.networth = networth.toFixed(2);
        overallData.totalInvested = totalInvested;
        setData(overallData);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Card
      sx={{
        width: "100%",
        height: "27vh",
        padding: "20px",
        backgroundColor: cardColors.background,
        overflow: "auto",
      }}
    >
      <CardContent sx={{ width: "100%", height: "100%" }}>
        <Typography sx={{ fontWeight: "bold" }} marginLeft="10px">
          NET WORTH
        </Typography>
        <Typography fontSize="8" color={colors.grey[300]} marginLeft="10px">
          does not account for currency balances and exchange rate
        </Typography>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ width: "100%", height: "90%" }}
        >
          <Typography variant="h1">${data.networth}</Typography>
          <Typography variant="h3">Total invested: ${parseFloat(data.totalInvested).toFixed(2)}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Networth;
