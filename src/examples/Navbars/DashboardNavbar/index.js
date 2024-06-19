import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import { Avatar } from "@mui/material";
import MDButton from "components/MDButton";
import { useAuth0 } from "@auth0/auth0-react";
import MenuItem from "@mui/material/MenuItem";

// toast
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const notificationIcons = {
  info: <InfoIcon />,
  success: <CheckCircleIcon />,
  error: <ErrorIcon />,
};
// React components
import MDBox from "components/MDBox";

// React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import { dark } from "@mui/material/styles/createPalette";
import RegistrationForm from "./RegisterForm/Registrationform";
// import brandDark from "assets/images/wrench.png";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import boxShadow from "assets/theme/functions/boxShadow";

function DashboardNavbar({ absolute, light, isMini }) {
  const { user, isAuthenticated, logout, loginWithRedirect, isLoading } = useAuth0();
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const [openNotification, setOpenNotification] = useState(false);
  const [showCustomMenu, setShowCustomMenu] = useState(false);
  const [customMenuAnchor, setCustomMenuAnchor] = useState(null);

  // toast
  // const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   fetchNotifications();
  // }, []);

  // const fetchNotifications = async () => {
  //   try {
  //     const response = await axios.get("/notifications");
  //     setNotifications(response.data);
  //   } catch (error) {
  //     console.error("Error fetching notifications:", error);
  //   }
  // };

  // const handleNotification = (notification) => {
  //   if (notification.source === "automatic") {
  //     toast.info(notification.message);
  //   } else {
  //     setNotifications([notification, ...notifications]);
  //   }

  //   if (notifications.length > 5) {
  //     setNotifications(notifications.slice(0, 5));
  //   }
  // };

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar, isAuthenticated, isLoading, user]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => {
    setOpenConfigurator(dispatch, !openConfigurator);
    handleClickMenuItem();
  };
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const handleClickMenuItem = () => {
    handleCloseMenu();
  };

  const handleOpenNotification = (event) => {
    setOpenNotification(event.currentTarget);
  };
  const handleCloseNotification = () => setOpenNotification(false);
  const { sidenavColor } = controller;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openNotification &&
        !event.target.closest(".custom-menu") &&
        !event.target.closest(".notification-button")
      ) {
        handleCloseNotification();
      }
    };

    if (openNotification) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openNotification]);

  const renderMenu = () =>
    openNotification && (
      <div
        style={{
          position: "absolute",
          top: "100px",
          right: "155px",
          background: "#0000006e",
          zIndex: " 1300",
          borderRadius: "7px",
          padding: "5px",
          fontSize: "13px",
        }}
      >
        <ul
          style={{
            width: "150px",
            listStyleType: "none",
            margin: 0,
            padding: 0,
          }}
        >
          <li
            style={{
              padding: "5px",
              textAlign: "center",
            }}
          >
            No new notifications
          </li>
        </ul>
      </div>
    );
  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  // const isLoggedIn = isAuthenticated;
  // const isSigningUp = !isAuthenticated;
  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    handleClickMenuItem();
  };

  return (
    <>
      <RegistrationForm />

      <AppBar
        position={absolute ? "absolute" : navbarType}
        color="inherit"
        sx={(darkMode) => navbar(darkMode, { transparentNavbar, absolute, light, darkMode })}
      >
        <Toolbar sx={(darkMode) => navbarContainer(darkMode)}>
          <MDBox mb={{ xs: 1, md: 0 }} sx={(darkMode) => navbarRow(darkMode, { isMini })}>
            <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} />
          </MDBox>
          {isMini ? null : (
            <MDBox sx={(darkMode) => navbarRow(darkMode, { isMini })}>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                onClick={handleOpenMenu}
                style={{ fontSize: "35px", background: "#0000006e", borderRadius: "25px" }}
              >
                <Icon style={{ fontSize: "35px" }}>person_rounded</Icon>
              </IconButton>

              <Menu anchorEl={openMenu} open={Boolean(openMenu)} onClose={handleCloseMenu}>
                {/* <MenuItem onClick={handleMiniSidenav}>
                  <IconButton size="small" disableRipple color="inherit">
                    <Icon sx={iconsStyle} fontSize="medium">
                      {isMini ? "menu_open" : "menu"}
                    </Icon>
                  </IconButton>
                  Mini Sidenav
                </MenuItem> */}
                <MenuItem
                  onClick={handleConfiguratorOpen}
                  sx={{ borderBottom: "1px solid #fff", borderRadius: "0" }}
                >
                  <IconButton size="small" disableRipple color="inherit">
                    <Icon sx={iconsStyle}>support_agent</Icon>
                  </IconButton>
                  Support
                </MenuItem>
                <MenuItem
                  onClick={handleOpenNotification}
                  sx={{ borderBottom: "1px solid #fff", borderRadius: "0" }}
                >
                  <IconButton size="small" disableRipple color="inherit">
                    <Icon sx={iconsStyle}>notifications</Icon>
                  </IconButton>
                  Notifications
                </MenuItem>

                {isAuthenticated ? (
                  <MenuItem>
                    <IconButton size="small" disableRipple color="inherit">
                      <Icon sx={iconsStyle}>logout</Icon>
                    </IconButton>
                    {/* Replace with your logo icon */}
                    <MDButton
                      rel="noreferrer"
                      variant="gradient"
                      color={sidenavColor}
                      onClick={handleLogout}
                      style={{
                        boxShadow: "none",
                        width: "100%",
                        background: "transparent",
                        justifyContent: "start",
                        padding: "0",
                      }}
                    >
                      Sign Out
                    </MDButton>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={() => loginWithRedirect()}>
                    <IconButton size="small" disableRipple color="inherit">
                      <Icon sx={iconsStyle}>logout</Icon>
                    </IconButton>
                    <MDButton
                      rel="noreferrer"
                      variant="gradient"
                      color={sidenavColor}
                      style={{
                        boxShadow: "none",
                        width: "100%",
                        background: "transparent",
                        justifyContent: "start",
                        padding: "0",
                      }}
                    >
                      Sign In
                    </MDButton>
                  </MenuItem>
                )}
              </Menu>
              {renderMenu()}
            </MDBox>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
