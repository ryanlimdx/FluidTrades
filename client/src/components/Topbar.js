import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "../api/axios";

// MUI components
import { Typography, Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, themeSettings, tokens } from "../theme";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";

// profile and platform
import Logo from "../assets/FluidTradesLogoBG.PNG";
import coinStack from "../assets/coin-stack.gif";

// icons
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ListItemIcon from "@mui/material/ListItemIcon";

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
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get("/profile")
      .then((response) => {
        console.log(response);
        setName(response.data.name);
        setEmail(response.data.email);
      })
      .catch((err) => console.log(err));
  }, [setName, setEmail]);

  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      color="appBar"
      enableColorOnDark
      elevation={0} // remove app bar shadow
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <div /> {/*to push elements right */}
        {/* Platform Title and Logo */}
        <Box display="flex">
          <Avatar alt="Logo" src={Logo} sx={{ width: 40, height: 40 }} />
          <Typography variant="h2" fontWeight="bold">
            FLUID TRADES
          </Typography>
        </Box>
        {/* Right Toolbar */}
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

          <IconButton size="large" onClick={openMenu} color="inherit">
            <AccountCircleIcon />
          </IconButton>

          <Menu open={open} onClose={closeMenu} anchorEl={anchorEl}>
            <Box margin="20px 20px 15px 20px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb="10px"
              >
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
                  {name}
                </Typography>
              </Box>
              <MenuItem
                onClick={() => navigate()} // logout
                size="small"
              >
                Logout
              </MenuItem>
            </Box>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
