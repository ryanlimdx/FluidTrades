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
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const data = [
  { name: "Singapore Airlines", price: 320 },
  { name: "Tesla", price: 150 },
  { name: "Twitter", price: 100 },
];

const PerformingAssets = () => {
  const [assets, setAssets] = useState({});

  useEffect(() => {
    setAssets(data);
  }, [assets]);

  return (
    <Card variant="outlined" sx={{ height: 26 + "vh", minWidth: 49 + "%", overflow: 'auto' }}>
      <CardContent>
        <Typography align="left" sx={{ fontWeight: "bold" }}>
          TOP 3 PERFORMING ASSETS
        </Typography>

        <Stack direction="row" justifyContent={"space-between"}>
          <List disablePadding>
            <ListItem>
              <TrendingUpIcon />
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
                  color: "#228b22",
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={assets?.[1]?.price}
                primaryTypographyProps={{
                  color: "#228b22",
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={assets?.[2]?.price}
                primaryTypographyProps={{
                  color: "#228b22",
                }}
              />
            </ListItem>
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PerformingAssets;
