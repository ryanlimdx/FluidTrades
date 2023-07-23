import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Stack,
  useTheme,
} from "@mui/material";
import { themeSettings, tokens } from "../../theme";
import axios from "../../api/axios";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const AssetsCard = ({ mode }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const themeColors = themeSettings(theme.palette.mode).palette;
  const cardColors = themeColors.card;

  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function fetchDataAndSort() {
      try {
        const response = await axios.get("/portfolio/assets");
        const data = response.data;
        // Sort the data by returns field based on the mode prop
        if (mode === "performing") {
          const positiveReturns = data.filter((asset) => asset.returns >= 0);
          positiveReturns.sort((a, b) => b.returns - a.returns);
          setAssets(positiveReturns.slice(0, 3));
        } else if (mode === "lagging") {
          const negativeReturns = data.filter((asset) => asset.returns < 0);
          negativeReturns.sort((a, b) => a.returns - b.returns);
          setAssets(negativeReturns.slice(0, 3));
        } else {
          // Handle other cases (e.g., "all") if needed
          setAssets(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataAndSort();
  }, [mode]);

  return (
    <Card
      display="flex"
      flexDirection="column"
      sx={{
        width: "100%",
        height: "100%",
        padding: "20px",
        backgroundColor: cardColors.background,
      }}
    >
      <CardContent>
        <Typography sx={{ fontWeight: "bold" }} marginLeft="10px">
          {mode === "performing" ? "TOP " : ""}
          {mode.toUpperCase()} ASSETS
        </Typography>

        {assets.length != 0 ? (
          <Stack
            direction="row"
            justifyContent={"space-between"}
            marginTop="20px"
          >
            <List disablePadding>
              <ListItem>
                <TrendingUpIcon />
              </ListItem>
              {assets.map((asset, index) => (
                <ListItem key={index}>
                  <ListItemText primary={asset.security} />
                </ListItem>
              ))}
            </List>

            <List disablePadding>
              <ListItem>
                <AttachMoneyIcon />
              </ListItem>
              {assets.map((asset, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={asset.returns.toFixed(2)}
                    primaryTypographyProps={{
                      color: mode === "performing" ? "#228b22" : "#d32f2f",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Stack>
        ) : (
          <Typography>You currently have no assets</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default AssetsCard;
