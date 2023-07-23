const express = require("express");
const router = express.Router();

// Set up market data API
const axios = require("axios");

// User Authentication Middleware
const { auth } = require("../middleware/auth");

const User = require("../schemas/User");

const Currency = require("../schemas/Currency");
const Stock = require("../schemas/Stock");
const Crypto = require("../schemas/Crypto");

// GET request to retrieve asset data
router.get("/assets", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const stocks = await Stock.find({ user: user }).lean();
    const cryptos = await Crypto.find({ user: user }).lean();
    const assets = stocks.concat(cryptos);

    for await (let item of assets) {
      const hours = Math.abs(Date.now() - item.lastModified) / 36e5;
      if (
        hours > 1 ||
        item.currPrice == "API limit exceeded" ||
        !item.currPrice
      ) {
        console.log("Updating database!");
        // refresh the data or fetch the latest data
        item.breakevenPrice = item.investedCapital / item.quantity;
        if (item.investedCapital < 0) {
          item.investedCapital = 0;
        }

        const options = {
          method: "GET",
          url: "https://twelve-data1.p.rapidapi.com/price",
          params: {
            symbol:
              item.sector === "Cryptocurrency"
                ? item.ticker + "/" + item.currency
                : item.ticker,
            format: "json",
            outputsize: "30",
          },
          headers: {
            "X-RapidAPI-Key":
              "1c8bce9d54msh8cbc95c564f2621p11f793jsnd17079bce2af",
            // "X-RapidAPI-Key": "673bac560cmshacd917fc1467ce3p17a520jsn9a4dc632f02a",
            "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
          },
        };

        try {
          // Another approach to go around the API limit would be:
          //   1. Set timeout
          //   2. Put the API in frontend to re render once the API can call again
          const priceResponse = await axios.request(options);
          const price = priceResponse.data.price;
          item.currPrice = price;
          item.marketValue = price * item.quantity;
          item.returns = item.marketValue - item.investedCapital;
          if (item.investedCapital == 0) {
            item.returnsPCT = "∞";
          } else {
            item.returnsPCT = (item.returns / item.investedCapital) * 100;
          }
        } catch (error) {
          item.currPrice = "API limit exceeded";
          item.marketValue = "API limit exceeded";
          item.returns = "API limit exceeded";
          item.returnsPCT = "API limit exceeded";
        } finally {
          // update and store the latest data in the server
          try {
            if (item.sector == "Cryptocurrency") {
              await Crypto.findOneAndUpdate(
                { user: user, ticker: item.ticker, currency: item.currency },
                {
                  $currentDate: {
                    lastModified: true,
                  },
                  $set: {
                    investedCapital: item.investedCapital,
                    breakevenPrice: item.breakevenPrice,
                    currPrice: item.currPrice,
                    returns: item.returns,
                    returnsPCT: item.returnsPCT,
                  },
                },
                { omitUndefined: true }
              );
            } else {
              await Stock.findOneAndUpdate(
                { user: user, ticker: item.ticker, currency: item.currency },
                {
                  $currentDate: {
                    lastModified: true,
                  },
                  $set: {
                    investedCapital: item.investedCapital,
                    breakevenPrice: item.breakevenPrice,
                    currPrice: item.currPrice,
                    returns: item.returns,
                    returnsPCT: item.returnsPCT,
                  },
                },
                { omitUndefined: true }
              );
            }
          } catch (error) {
            return res.status(500).send("Error: 500");
          }
        }
      } else {
        // dont need to update and manipulate the data
        continue;
      }
    }

    return res.status(200).send(JSON.stringify(assets));
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error: 500");
  }
});

// GET request to retrieve currency data
router.get("/currencies", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const currencies = await Currency.find({ user: user });
    return res.status(200).json(currencies);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
