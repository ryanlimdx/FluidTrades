import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import { Avatar } from "@mui/material";
import coinStack from "../assets/coin-stack.gif";
import Logo from "../assets/MoneyIconLogo.jpg";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";
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
      sx={{
        // "& .pro-sidebar-inner": {
        //   background: `${colors.primary[400]} !important`,
        // },
        // "& .pro-sidebar": {
        //     borderRight: "none !important",
        // },
        "& .ps-sidebar-container": {
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
        },
        // "& .ps-menu-button:hover": {
        //     /*changes text color when hover.*/
        //     color: `${colors.primary[700]} !important`,
        //     background: `${colors.grey[100]} !important`,
        //     borderRadius: "10px",
        // },
      }}
    >
      <Sidebar collapsed={isCollapsed} backgroundColor={colors.primary[400]}>
        <Menu
          menuItemStyles={{
            button: ({ isSubmenu, level, disabled, active, open }) => ({
              backgroundColor: active ? "#6870fa" : undefined,
              borderRadius: active ? "6px" : undefined,
              "&:hover": {
                backgroundColor: "#868dfb",
                borderRadius: "6px",
              },
            }),
          }}
        >
          {/* LOGO AND MENU ICON */}
          <Box 
            paddingLeft={isCollapsed ? undefined : "10%"}
            sx={{
              "& .ps-menu-button:hover": {
                  /*remove color when hover for header.*/
                  background: `none !important`
              },
            }}
          >
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Avatar
                    alt="Logo"
                    src={Logo}
                    sx={{ width: 40, height: 40, borderRadius: "50%" }}
                  />
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
          </Box>

          {!isCollapsed && (
            <Box margin="20px 20px 15px 20px">
              <Box display="flex" justifyContent="center" alignItems="center" mb="10px">
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

          <Box padding={isCollapsed ? undefined : "10%"}>
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
              to="/update-assets/stock"
              icon={<BusinessIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Update Currency"
              to="/update-assets/currency"
              icon={<CurrencyExchangeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Update Crypto"
              to="/update-assets/crypto"
              icon={<CurrencyBitcoinIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;