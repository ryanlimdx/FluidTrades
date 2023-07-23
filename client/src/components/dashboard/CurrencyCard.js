import { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Stack,
  Box,
  useTheme,
} from "@mui/material";
import { themeSettings } from "../../theme";
import axios from "../../api/axios";

const CurrencyCard = () => {
  const theme = useTheme();
  const themeColors = themeSettings(theme.palette.mode).palette;
  const cardColors = themeColors.card;

  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    axios
      .get("/portfolio/currencies")
      .then((response) => {
        setCurrencies(response.data);
        console.log(response.data);
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
          CURRENCIES
        </Typography>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ width: "100%", height: "90%" }}
        >
          {currencies.length !== 0 ? (
            <Stack direction="row" justifyContent={"space-between"} sx={{width: "100%"}}>
              <List disablePadding>
                {currencies.map((asset, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={asset.currency} />
                  </ListItem>
                ))}
              </List>

              <List disablePadding>
                {currencies.map((asset, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={asset.balance.toFixed(2)} />
                  </ListItem>
                ))}
              </List>
            </Stack>
          ) : (
            <Typography mt="20px">You currently have no currencies</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrencyCard;
