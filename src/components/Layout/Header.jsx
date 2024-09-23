import React, { useState } from "react";
import MuiAppBar from "@mui/material/AppBar";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { uiActions } from "../../store/ui";
import { useNavigate } from "react-router-dom";

import PasswordIcon from "@mui/icons-material/Password";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../store/auth";

const drawerWidth = process.env.REACT_APP_DRAWER_WIDTH;

// AppBar
const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,

  transition: theme.transitions.create("width"),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
}));

export default function Header() {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const currentUser = sessionStorage.getItem("username");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);

  };

  return (
    <AppBar open={sidebarOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          size="large"
          edge="start"
          sx={{ mr: 2 }}
          onClick={() => dispatch(uiActions.toggleMenu())}
        >
          <MenuIcon />
        </IconButton>

        <Typography component="h1" variant="h5" noWrap sx={{ flexGrow: 1 }}>
          Clarusway Stock App
        </Typography>
        <Box
          sx={{ cursor: "pointer" }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <Avatar src="/broken-image.jpg" alt={currentUser.toUpperCase()} />
          </Box>

          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Avatar
                  src="/broken-image.jpg"
                  alt={currentUser.toUpperCase()}
                  variant="square"
                />
                <Stack direction="column" textAlign="center">
                  <Typography
                    ml="50px"
                    variant="h6"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {currentUser}
                  </Typography>
                  <Typography
                    ml="50px"
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize", color: "gray" }}
                  >
                    {sessionStorage.getItem("admin") ? "Admin" : "User"}
                  </Typography>
                </Stack>
              </Stack>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => navigate("/stock/profile")}>
              <PasswordIcon sx={{ mr: 2 }} />
              Change Password
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => dispatch(logout(navigate))}>
              <LogoutIcon sx={{ mr: 2 }} />
              Logout
            </MenuItem>
          </Menu>
 
      </Toolbar>
    </AppBar>
  );
}
