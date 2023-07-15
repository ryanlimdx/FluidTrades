import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import { Avatar } from "@mui/material";
import coinStack from "../assets/coin-stack.gif";
import Logo from "../assets/FluidTradesLogoBG.PNG";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from '@mui/icons-material/Close';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        setSelected(title);
        navigate(`${to}`);
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      display="flex"
      
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              // color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Avatar alt="Logo" src={Logo} sx={{ width: 40, height: 40 }} />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="coin stack"
                  width="100px"
                  height="100px"
                  src={coinStack}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h5" color={colors.grey[100]}>
                  Keep stacking
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Portfolio"
              to="/portfolio"
              icon={<ShowChartIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Transaction Records"
              to="/transactions"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Update Stocks"
              to="/updateAssets/stock"
              icon={<BusinessIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Update Currency"
              to="/updateAssets/currency"
              icon={<CurrencyExchangeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Update Crypto"
              to="/updateAssets/crypto"
              icon={<CurrencyBitcoinIcon/>}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
