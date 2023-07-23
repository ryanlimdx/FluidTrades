import { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import axios from "../../api/axios";

const CurrencyCard = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    axios
      .get("/portfolio/currencies")
      .then((response) => {setCurrencies(response.data); console.log(response.data)})
      .catch((error) => console.log(error));
  }, []);

  return (
    <Card
      variant="outlined"
      sx={{ maxHeight: "100%", width: "100%", padding: "20px" }}
    >
      <CardContent>
        <Typography sx={{ fontWeight: "bold" }} marginLeft="10px">
          CURRENCIES
        </Typography>

        <Stack direction="row" justifyContent={"space-between"}>
          <List disablePadding >
            {currencies.map((asset, index) => (
              <ListItem key={index}>
                <ListItemText primary={asset.currency} />
              </ListItem>
            ))}
          </List>

          <List disablePadding>
            {currencies.map((asset, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={asset.balance.toFixed(2)}
                />
              </ListItem>
            ))}
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CurrencyCard;