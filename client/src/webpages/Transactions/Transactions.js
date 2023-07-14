import { useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import StockTransactions from "./StockTransactions";
import CurrencyTransactions from "./CurrencyTransactions";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Transactions = () => {
    const [form, setForm] = useState("Stock")
    
    const handleChange = (event) => {
        setForm(event.target.value);
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
                    <MenuItem value="Stock">Stock</MenuItem>
                    <MenuItem value="Currency">Currency</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            { form === "Stock"
                ? <StockTransactions/>
                : <CurrencyTransactions/>
            }

        </Box>
    );
};

export default Transactions;
