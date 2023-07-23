import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton
} from "@mui/material";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';

const RealTimeSearch = () => {
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState(null);
  const [found, setFound] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [price, setPrice]);

  const handleChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleEnter = (event) => {
    if (event.keyCode === 13 ) {
      event.preventDefault();
    }
  }

  const handleClick = async () => {
    setLoading(true);
    try {
      await axios({
        method: 'get',
        url: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.REACT_APP_ALPHAVINTAGE_KEY}`,
      }).then(function (response) {
        if (response.data['Global Quote']) {
          const newPrice = parseFloat(response.data['Global Quote']['05. price']).toFixed(2);
          setPrice(newPrice);
          setFound(true);
        } else {
          setPrice(null);
          setFound(false);
        }
      })
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  function renderPrice() {
    if (found && !isNaN(price)) {
      return <Typography> {symbol.toUpperCase()}: ${price} </Typography>;
    } else if (isNaN(price)) {
      return <Typography> Not found, try again. </Typography>;
    } else {
      return null;
    }
  }

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "20ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" color="#7E909A">
        Real-time Price Search
      </Typography>
      <Stack direction="row" minWidth="100%" justifyContent="space-between">
        <TextField
          id="outlined-basic"
          label="Ticker"
          variant="standard"
          helperText="Input the stock ticker and click search."
          onKeyDown={handleEnter}
          value={symbol}
          onChange={handleChange}
          fullWidth
          InputProps={{
            endAdornment: (symbol !== "") ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="close"
                  onClick={() => {
                    setSymbol("");
                    setPrice(null);
                    setFound(false);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
        <Button
          variant="text"
          onClick={handleClick}
          size="large"
          endIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Stack>
      {loading && <Typography m={20}> Loading... </Typography>}
      {renderPrice()}
    </Box>
  );
};

export default RealTimeSearch;