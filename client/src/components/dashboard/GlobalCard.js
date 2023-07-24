import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import { themeSettings, tokens } from "../../theme";
import MarketChart from "./MarketChart";

const Global = () => {
  const theme = useTheme();
  const themeColors = themeSettings(theme.palette.mode).palette;
  const colors = tokens(theme.palette.mode);
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

        <Box sx={{ height: "8vh" }}>
          <Typography sx={{ color: colors.grey[300] }}>NEW YORK: SPY</Typography>
          <MarketChart symbol="SPY" loading={true} />
        </Box>

        <Box sx={{ height: "8vh" }}>
          <Typography mt="20px" sx={{ color: colors.grey[300] }}>HONG KONG: EWH</Typography>
          <MarketChart symbol="EWH" loading={true} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Global;
