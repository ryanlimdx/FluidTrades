import React, { useState, useContext, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

// Context
import { ProfileContext } from "../context/nameContext";

// MUI components
import {
  Typography,
  Box,
  IconButton,
  useTheme,
  ListItemIcon,
  Button,
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

const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const logout = useLogout();
  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const themeColors = themeSettings(theme.palette.mode).palette;

  const navigate = useNavigate();

  const { name, email } = useContext(ProfileContext);
  const [nameValue, setName] = name;
  const [emailValue, setEmail] = email;

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
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{
              "& .MuiMenu-paper": {
                borderRadius: "10px",
              },
              "& .MuiList-root": {
                backgroundColor: themeColors.card.background,
              },
              marginTop: "20px",
            }}
          >
            <Box margin="0 7px 0 7px">
              <Box
                display="flex"
                flexDirection="column"
                marginBottom="5px"
                padding="20px"
                borderRadius="10px"
                backgroundColor={themeColors.card.main}
              >
                <Box // profile card
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
                      {nameValue}
                    </Typography>
                    <Typography variant="h6" color={colors.grey[100]}>
                      {emailValue}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="outlined"
                  onClick={() => {
                    navigate("/profile");
                    closeMenu();
                  }}
                  size="small"
                  sx={{
                    marginLeft: "90px",
                    marginTop: "10px",
                    borderColor: themeColors.button.border,
                    color: colors.grey[100],
                    borderRadius: "10px",
                    "&:hover": {
                      borderColor: themeColors.button.borderHover,
                    },
                  }}
                >
                  Manage your account
                </Button>
              </Box>

              <MenuItem
                onClick={logout}
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
