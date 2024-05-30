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

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MDButton from "components/MDButton";
import { useAuth0 } from "@auth0/auth0-react";

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
import MDInput from "components/MDInput";

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
// import RegistrationForm from "./RegisterForm/Registrationform";
// import brandDark from "assets/images/wrench.png";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast } from "react-toastify";

function DashboardNavbar({ absolute, light, isMini }) {
  const { user, isAuthenticated, logout, loginWithRedirect, isLoading } = useAuth0();
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  // toast
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("/notifications");
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleNotification = (notification) => {
    if (notification.source === "automatic") {
      // If notification is automatic, show a toast
      toast.info(notification.message);
    } else {
      // If notification is from form submission, add it to the notification list
      setNotifications([notification, ...notifications]);
    }

    // Limit the list to 5 notifications
    if (notifications.length > 5) {
      setNotifications(notifications.slice(0, 5));
    }
  };

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
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const { sidenavColor } = controller;
  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      {/* <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" /> */}
      <ul
        style={{
          width: "150px",
          listStyleType: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li
              key={index}
              style={{
                borderBottom: "1px solid #bafff7",
                padding: "5px",
              }}
            >
              {notification.message}
            </li>
          ))
        ) : (
          <li
            style={{
              padding: "5px",
              textAlign: "center",
            }}
          >
            No new notifications
          </li>
        )}
      </ul>
    </Menu>
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

  return (
    <>
      {/* <RegistrationForm /> */}

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
              <MDBox color={light ? "white" : "inherit"}>
                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarMobileMenu}
                  onClick={handleMiniSidenav}
                >
                  <Icon sx={iconsStyle} fontSize="medium">
                    {miniSidenav ? "menu_open" : "menu"}
                  </Icon>
                </IconButton>
                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  // sx={navbarIconButton}
                  aria-controls="build"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={handleConfiguratorOpen}
                >
                  <Icon sx={iconsStyle}>
                    build
                    {/* <img src={brandDark} alt="doubt logo" /> */}
                  </Icon>
                </IconButton>
                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  // sx={navbarIconButton}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={handleOpenMenu}
                >
                  <Icon sx={iconsStyle}>notifications</Icon>
                </IconButton>
                {renderMenu()}
              </MDBox>
              {isAuthenticated ? (
                <>
                  <MDButton
                    // component=""
                    // target="_blank"
                    rel="noreferrer"
                    variant="gradient"
                    color={sidenavColor}
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                    style={{ marginLeft: "5px" }}
                  >
                    Sign Out
                  </MDButton>
                </>
              ) : (
                <>
                  <MDButton
                    // component=""
                    // target="_blank"
                    rel="noreferrer"
                    variant="gradient"
                    color={sidenavColor}
                    onClick={() => loginWithRedirect()}
                    style={{ marginLeft: "5px" }}
                  >
                    Sign In
                  </MDButton>
                </>
              )}
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
