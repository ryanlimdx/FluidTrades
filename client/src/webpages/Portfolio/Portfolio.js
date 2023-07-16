import { useState } from "react";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import StockTransactions from "./StockTransactions";
import CurrencyTransactions from "./CurrencyTransactions";
import Fab from "@mui/material/Fab";

import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Transactions = () => {
  const [form, setForm] = useState("stock");

  const handleChange = (event) => {
    setForm(event.target.value);
  };

  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/updateAssets/" + form);
  };

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

      {form === "stock" ? <StockTransactions /> : <CurrencyTransactions />}

      <Fab
        onClick={handleAdd}
        sx={{
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',}
        }
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Transactions;
