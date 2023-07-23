import { useState } from "react";
import { 
  Box, 
  Chip, 
  Fab, 
  // useTheme 
} from "@mui/material";
// import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import { ClickAwayListener } from "@mui/base";

import BusinessIcon from "@mui/icons-material/Business";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import AddIcon from "@mui/icons-material/Add";

const FloatingTool = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const Item = ({ title, to, icon, color }) => {
    const navigate = useNavigate();

    return (
      <Chip
        label={title}
        onClick={() => {
          navigate(`${to}`);
        }}
        icon={icon}
        color="secondary"
        clickable
        sx={{
          height: 45,
          width: 200,
          m: "5px",
        }}
      />
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        margin: 0,
        top: "auto",
        right: 20,
        bottom: 20,
        left: "auto",
        position: "fixed",
      }}
    >
      {!isCollapsed && (
        <ClickAwayListener onClickAway={() => setIsCollapsed(true)}>
          <Box display="flex" flexDirection="column">
            <Item
              title="Update Stocks"
              to="/update-assets/stock"
              icon={<BusinessIcon />}
            />
            <Item
              title="Update Currency"
              to="/update-assets/currency"
              icon={<CurrencyExchangeIcon />}
            />
            <Item
              title="Update Crypto"
              to="/update-assets/crypto"
              icon={<CurrencyBitcoinIcon />}
            />
          </Box>
        </ClickAwayListener>
      )}

      <Box display="flex" justifyContent="flex-end" margin="10px">
        <Fab onClick={() => setIsCollapsed(!isCollapsed)}>
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default FloatingTool;