const express = require("express");
const router = express.Router();

// User Authentication Middleware
const { auth } = require("../middleware/auth");

const User = require("../schemas/User");
const Stock = require("../schemas/Stock");
const Crypto = require("../schemas/Crypto");

// GET request for exposure chart
router.get("/exposure", auth, async (req, res) => {
  try {
    const sectorMap = new Map();
    const user = await User.findById(req.userId);
    const stocks = await Stock.find({ user: user }).lean();
    const cryptos = await Crypto.find({ user: user }).lean();
    const assets = stocks.concat(cryptos);

    assets.forEach((item) => {
      const sector = item.sector;
      const investedCapital = item.investedCapital;
  
      // If the sector is not present in the map, add it with the invested capital as the value
      if (!sectorMap.has(sector)) {
        sectorMap.set(sector, investedCapital);
      } else {
        // If the sector already exists in the map, add the invested capital to the existing value
        sectorMap.set(sector, sectorMap.get(sector) + investedCapital);
      }
    });

    const consolidatedData = [];
    for (const [sector, investedCapital] of sectorMap) {
      consolidatedData.push({ id: sector,  value: investedCapital });
    };

    res.status(200).send(consolidatedData);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;