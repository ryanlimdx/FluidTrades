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
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const data = [
  { name: "Gamestop", price: -500 },
  { name: "Ethereum", price: -300 },
  { name: "Bed Bath & Beyond", price: -200 },
];

const LaggingAssets = () => {
  const [assets, setAssets] = useState({});

  useEffect(() => {
    setAssets(data);
  }, [assets]);

  return (
    <Card variant="outlined" sx={{ maxHeight: 26 + "vh", minWidth: 49 + "%", overflow: 'auto' }}>
      <CardContent>
        <Typography align="left" sx={{ fontWeight: "bold" }}>
          TOP 3 LAGGING ASSETS
        </Typography>

        <Stack direction="row" justifyContent={"space-between"} >
          <List disablePadding>
            <ListItem>
              <TrendingDownIcon />
            </ListItem>
            <ListItem>
              <ListItemText primary={assets?.[0]?.name} />
            </ListItem>
            <ListItem>
              <ListItemText primary={assets?.[1]?.name} />
            </ListItem>
            <ListItem>
              <ListItemText primary={assets?.[2]?.name} />
            </ListItem>
          </List>

          <List disablePadding>
            <ListItem>
              <AttachMoneyIcon />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={assets?.[0]?.price}
                primaryTypographyProps={{
                  color: "red",
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={assets?.[1]?.price}
                primaryTypographyProps={{
                  color: "red",
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={assets?.[2]?.price}
                primaryTypographyProps={{
                  color: "red",
                }}
              />
            </ListItem>
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LaggingAssets;
