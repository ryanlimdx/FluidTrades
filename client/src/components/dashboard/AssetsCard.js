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
  Box,
  IconButton,
  Skeleton,
} from "@mui/material";
import { themeSettings } from "../../theme";
import axios from "../../api/axios";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PercentIcon from "@mui/icons-material/Percent";
import SwitchLeftOutlinedIcon from "@mui/icons-material/SwitchLeftOutlined";

const AssetsCard = ({ mode }) => {
  const theme = useTheme();
  const themeColors = themeSettings(theme.palette.mode).palette;
  const cardColors = themeColors.card;

  const [assets, setAssets] = useState([]);
  const [modeValue, setMode] = useState(mode);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDataAndSort() {
      try {
        const response = await axios.get("/portfolio/assets");
        const data = response.data;
        // Sort the data by returns field based on the mode prop
        if (modeValue === "performing") {
          const positiveReturns = data.filter((asset) => asset.returns >= 0);
          positiveReturns.sort((a, b) => b.returns - a.returns);
          setAssets(positiveReturns.slice(0, 3));
          setLoading(false);
        } else if (modeValue === "lagging") {
          const negativeReturns = data.filter((asset) => asset.returns < 0);
          negativeReturns.sort((a, b) => a.returns - b.returns);
          setAssets(negativeReturns.slice(0, 3));
          setLoading(false);
        } else {
          setAssets(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataAndSort();
  }, [modeValue]);

  return (
    <Card
      sx={{
        width: "100%",
        height: "27vh",
        padding: "20px",
        backgroundColor: cardColors.background,
      }}
    >
      {isLoading ? (
        <Skeleton variation="rectangular" width="100%" height="100%" />
      ) : (
        <CardContent sx={{ width: "100%", height: "100%" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ fontWeight: "bold" }} marginLeft="10px">
              {modeValue === "performing" ? "TOP " : ""}
              {modeValue.toUpperCase()} ASSETS
            </Typography>
            <IconButton
              onClick={() => {
                if (modeValue === "performing") {
                  setLoading(true);
                  setMode("lagging");
                } else {
                  setLoading(true);
                  setMode("performing");
                }
              }}
            >
              <SwitchLeftOutlinedIcon />
            </IconButton>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center">
            {assets.length !== 0 ? (
              <Stack
                direction="row"
                justifyContent={"space-between"}
                marginTop="20px"
                width="100%"
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

                <Box display="flex">
                  <List disablePadding>
                    <ListItem>
                      <AttachMoneyIcon />
                    </ListItem>
                    {assets.map((asset, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={asset.returns.toFixed(2)}
                          primaryTypographyProps={{
                            color:
                              modeValue === "performing"
                                ? "#228b22"
                                : "#d32f2f",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <List disablePadding>
                    <ListItem>
                      <PercentIcon />
                    </ListItem>
                    {assets.map((asset, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={
                            asset.returnsPCT === "∞"
                              ? asset.returnsPCT
                              : asset.returnsPCT.toFixed(2) + "%"
                          }
                          primaryTypographyProps={{
                            color:
                              modeValue === "performing"
                                ? "#228b22"
                                : "#d32f2f",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Stack>
            ) : (
              <Typography mt="20px">
                You currently have no {modeValue} assets
              </Typography>
            )}
          </Box>
        </CardContent>
      )}
    </Card>
  );
};

export default AssetsCard;
