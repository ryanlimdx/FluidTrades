import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "../api/axios";

// MUI components
import {
  Typography,
  Box,
  IconButton,
  useTheme,
  ListItemIcon,
} from "@mui/material";
import { ColorModeContext, tokens, themeSettings } from "../theme";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";

// profile and platform
import Logo from "../assets/FluidTradesLogoBG.PNG";
import coinStack from "../assets/coin-stack.gif";

// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { borderRadius } from "@mui/system";

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
  const themeColors = themeSettings(theme.palette.mode).palette;

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
  }, []);

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

          <Menu
            open={open}
            onClose={closeMenu}
            anchorEl={anchorEl}
            sx={{
              "& .MuiMenu-paper": {
                borderRadius: "10px",
              },
              "& .MuiList-root": {
                backgroundColor: themeColors.profileDropdown.background,
              },
              marginTop: "20px",
            }}
          >
            <Box margin="0 7px 0 7px">
              <Box // profile card
                marginBottom="5px"
                padding="20px"
                borderRadius="10px"
                backgroundColor={themeColors.profileDropdown.main}
                display="flex"
                alignItems="center"
              >
                <Box mr="20px">
                  <img
                    alt="profile icon"
                    width="70px"
                    height="70px"
                    src={coinStack}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                    onClick={() => {
                      navigate("/profile");
                      closeMenu();
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="h5" color={colors.grey[100]} mb="1px">
                    {name}
                  </Typography>
                  <Typography variant="h6" color={colors.grey[100]}>
                    {email}
                  </Typography>
                </Box>
              </Box>

              <MenuItem
                onClick={() => navigate("/login")} // temporary logout method
                sx={{
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
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
