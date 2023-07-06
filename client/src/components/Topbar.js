import React, { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../assets/FluidTradesLogoBG.PNG";

// MUI components
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";

// icons
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

const links = [
  { name: "Dashboard", icon: <DashboardOutlinedIcon />, to: "/" },
  { name: "Update Stocks", icon: <DashboardOutlinedIcon />, to: "/updateAssets/stock" },
  { name: "Update Currency", icon: <DashboardOutlinedIcon />, to: "/updateAssets/currency" },
];

const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleProfileLinkClick = () => {
    navigate("/profile");
  };

  const openMenu = (e) => {
    setAnchorEl(e.target);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          backgroundColor: "#1C4E80",
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
        <Stack direction="row" sx={{ minWidth: 0 }}>
          <Avatar alt="Logo" src={Logo} />
          <Typography sx={{ marginTop: 0, fontSize:26}}> Fluid Trades </Typography>
        </Stack>
        <IconButton
          size="large"
          onClick={handleProfileLinkClick}
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
