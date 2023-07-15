import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import Logo from "../assets/FluidTradesLogoBG.PNG";
import { ColorModeContext, themeSettings, tokens } from "../theme";

// MUI components
import { Typography, Box, IconButton, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";

// icons
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ListItemIcon from "@mui/material/ListItemIcon";

const links = [
  { name: "Dashboard", icon: <DashboardOutlinedIcon />, to: "/" },
  { name: "Update Stocks", icon: <DashboardOutlinedIcon />, to: "/updateAssets/stock" },
  { name: "Update Currency", icon: <DashboardOutlinedIcon />, to: "/updateAssets/currency" },
  { name: "Transactions", icon: <DashboardOutlinedIcon />, to: "/transactions" }
];

const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const openMenu = (e) => {
    setAnchorEl(e.target);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const themeColors = themeSettings(theme.palette.mode).palette;
  const appBarColor = themeColors.background.default;

  const navigate = useNavigate();
  const handleProfileLinkClick = () => {
    navigate("/profile");
  };

  return (
    <AppBar
      position="sticky"
      // sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}
      // color="default"
      sx = {{ background: appBarColor }} 
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          padding: 2
        }}
      >
        <IconButton size="large" color="inherit" onClick={openMenu}>
          <MenuIcon />
        </IconButton>

        <Menu open={open} onClose={closeMenu} anchorEl={anchorEl}>
          {links.map(({ name, icon, to }) => (
            <MenuItem
              onClick={() => navigate(`${to}`) }
              // sx={{ fontSize: 30 }}
              size="small"
              key={name}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              {name}
            </MenuItem>
          ))}
        </Menu>

        <Box display="flex">
          <Avatar 
            alt="Logo" 
            src={Logo}
            sx={{ width: 40, height: 40 }}
          />
          <Typography
            variant="h2" 
            fontWeight="bold" 
          > 
            FLUID TRADES 
          </Typography>
        </Box>
        
        <Box display="flex">
          <IconButton
            size="large"
            onClick={colorMode.toggleColorMode} 
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton
            size="large"
            onClick={handleProfileLinkClick}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
