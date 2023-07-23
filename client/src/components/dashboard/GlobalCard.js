import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import { themeSettings } from "../../theme";
import MarketChart from "./MarketChart";

const Global = () => {
  const theme = useTheme();
  const themeColors = themeSettings(theme.palette.mode).palette;
  const cardColors = themeColors.card;

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
        <Typography sx={{ fontWeight: "bold" }}>GLOBAL</Typography>

        <Box sx={{ gridArea: "hk", height: "8vh" }}>
          <MarketChart symbol="SPY" />
        </Box>

        <Box sx={{ gridArea: "hk", height: "8vh" }}>
          <MarketChart symbol="EWH" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Global;
