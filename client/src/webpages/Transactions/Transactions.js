import { useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import StockTransactions from "./StockTransactions";
import CurrencyTransactions from "./CurrencyTransactions";
import FloatingTool from "../../components/FloatingTool";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Transactions = () => {
  const [form, setForm] = useState("stock");

  const handleChange = (event) => {
    setForm(event.target.value);
  };

  // Swapped out automatic form functionality for more precise selection of forms
  // const navigate = useNavigate();
  // const handleAdd = () => {
  //   navigate("/updateAssets/" + form);
  // };

  return (
    <Box margin="20px">
      <Header title="TRANSACTIONS" />
      <Box>
        <FormControl fullWidth>
          <InputLabel id="txn-asset-picker-label">Asset</InputLabel>
          <Select
            labelId="txn-asset-picker"
            label="Asset"
            id="txn-asset-picker"
            value={form}
            onChange={handleChange}
          >
            <MenuItem value="stock">Stock</MenuItem>
            <MenuItem value="currency">Currency</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {form === "stock" ? <StockTransactions margin="40px 0 0 0" height="75vh"/> : <CurrencyTransactions margin="40px 0 0 0" height="75vh"/>}

      <FloatingTool />
    </Box>
  );
};

export default Transactions;
