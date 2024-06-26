import { useState, useEffect, useMemo } from "react";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { startToastManager, stopToastManager } from "layouts/toastmanager";
import { useAuth0 } from "@auth0/auth0-react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// React components
import MDBox from "components/MDBox";

// React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// React Dark Mode themes
import themeDark from "assets/theme-dark";

// React routes
import routes from "routes";

// React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/workverse-logo.png";
import brandDark from "assets/images/workverse-logo.png";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      startToastManager();
    }

    return () => {
      stopToastManager();
    };
  }, [isAuthenticated]);

  return (
    <div id="bg-main-img">
      <ThemeProvider theme={themeDark}>
        <CssBaseline />
        {isAuthenticated && (
          <ToastContainer
            position="top-right"
            autoClose={3000}
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            hideProgressBar={true}
            toastStyle={{
              minHeight: "50px",
              width: "270px",
              fontSize: "15px",
              backgroundColor: "#000000",
              color: "#ffffff",
              // border: "1px solid #fff",
            }}
          />
        )}
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            ></Sidenav>
            <Configurator />
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}
