import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import axios from "../../api/axios";

const AssetsCard = ({ mode }) => {
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
      variant="outlined"
      sx={{ height: 26 + "vh", minWidth: 49 + "%", overflow: "auto" }}
    >
      <CardContent>
        <Typography align="left" sx={{ fontWeight: "bold" }}>
          TOP 3 {mode.toUpperCase()} ASSETS
        </Typography>

        <Stack direction="row" justifyContent={"space-between"}>
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
                  primary={asset.returns}
                  primaryTypographyProps={{
                    color: mode === "positive" ? "#228b22" : "#d32f2f",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AssetsCard;