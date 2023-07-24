import { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  useTheme,
  Skeleton,
} from "@mui/material";
import { themeSettings, tokens } from "../../theme";
import axios from "../../api/axios";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Networth = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const themeColors = themeSettings(theme.palette.mode).palette;
  const cardColors = themeColors.card;

  const [data, setData] = useState([]);
  const [dataPresent, setPresence] = useState(true);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/portfolio/assets")
      .then((response) => {
        if (!response.data.length) {
          setPresence(false);
        }

        var overallData = [];
        var networth = 0;
        var totalInvested = 0;
        response.data.forEach((asset) => {
          totalInvested += asset.investedCapital;
          if (asset.marketValue !== "API limit exceeded" && asset.marketValue) {
            networth += asset.marketValue;
          }
        });
        var returns = networth - totalInvested;
        overallData.networth = networth;
        overallData.totalInvested = totalInvested;
        overallData.returns = returns;

        setData(overallData);
        setLoading(false);
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

        <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{width: "100%", height: "95%"}}>
        <Box display="flex" flexDirection="column" alignItems="center">
          {isLoading ? (
            <Skeleton variation="rectangular" width="100%" height="100%" />
          ) : dataPresent ? (
            <Box
              display="flex"
              flexDirection="column"
              marginLeft="10px"
              marginTop="20px"
              sx={{ width: "100%", height: "90%" }}
            >
              <Typography
                variant="h1"
                fontSize="80"
                sx={{ fontWeight: "bold" }}
              >
                ${parseInt(data.networth)}
              </Typography>
              <Box display="flex" flexDirection="column">
                <Typography variant="h6">
                  Total invested: ${parseInt(data.totalInvested)}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" mr="10px">
                    Returns:
                  </Typography>
                  {data.returns > 0 ? (
                    <ArrowDropUpIcon sx={{ color: "#228b22" }} />
                  ) : data.returns === 0 ? (
                    <></>
                  ) : (
                    <ArrowDropDownIcon sx={{ color: "#d32f2f" }} />
                  )}
                  <Typography variant="h6">
                    ${parseInt(data.returns)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ) : (
            <Typography mt="20px">You currently have no assets</Typography>
          )}
        </Box>

        <Typography
          variant="disclaimer"
          color={colors.grey[300]}
          marginLeft="10px"
          marginBottom="10%"
        >
          *does not include cash balances, exchange rate
        </Typography>
        </Box>
        
      </CardContent>
    </Card>
  );
};

export default Networth;
