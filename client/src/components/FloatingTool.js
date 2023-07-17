import { useState } from "react";
import { Box, Chip, Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ClickAwayListener } from "@mui/base";

import BusinessIcon from "@mui/icons-material/Business";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AddIcon from "@mui/icons-material/Add";

const FloatingTool = () => {
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
              to="/updateAssets/stock"
              icon={<BusinessIcon />}
              color
            />
            <Item
              title="Update Currency"
              to="/updateAssets/currency"
              icon={<CurrencyExchangeIcon />}
              color
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
