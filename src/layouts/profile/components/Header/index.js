// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Icon, IconButton } from "@mui/material";

// React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// React base styles
import breakpoints from "assets/theme/base/breakpoints";
import boxShadow from "assets/theme/functions/boxShadow";

function Header({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  // profile image
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const { isAuthenticated, user } = useAuth0();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user && user.email) {
          const response = await axios.get(`http://localhost:8000/users?email=${user.email}`);
          // console.log("API Response:", response.data);
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // toast.error("Error fetching user data");
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, user]);

  return (
    <MDBox position="relative">
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="5rem"
        borderRadius="xl"
      />
      <Card
        sx={{
          position: "absolute",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
        style={{
          background: "transparent",
          zIndex: "99",
          backdropFilter: "blur(0)",
          top: "88px",
          boxShadow: "none",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item style={{ position: "relative" }}>
            <label htmlFor="upload-image">
              <IconButton
                color="primary"
                aria-label="edit profile"
                component="span"
                style={{ position: "absolute", top: 10, left: 85, fontSize: "14px" }}
              >
                <Icon>edit</Icon>
              </IconButton>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="upload-image"
            />
            <MDAvatar
              src={image}
              alt="profile-image"
              size="xl"
              shadow="sm"
              style={{ background: "#00000096", boxShadow: "none" }}
            />
          </Grid>

          {userData && (
            <>
              <Grid item>
                <MDBox height="100%" mt={0.5} lineHeight={1}>
                  <MDTypography
                    variant="h5"
                    fontWeight="medium"
                    style={{ textTransform: "Uppercase" }}
                  >
                    {userData.organization}
                  </MDTypography>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    {userData.designation}
                  </MDTypography>
                </MDBox>
              </Grid>

              {/* <div
                style={{
                  marginLeft: "auto",
                  color: "#fff",
                  fontSize: "14px",
                  textAlign: "end",
                  padding: "30px 10px 0",
                }}
              >
                <MDTypography
                  variant="h6"
                  fontWeight="small"
                  style={{
                    fontSize: "14px",
                  }}
                >
                  Status :
                  <span style={{ color: "#fff", fontWeight: "400", marginLeft: "5px" }}>
                    {userData.status}
                  </span>
                </MDTypography>
                {userData && userData.status && userData.status.includes("NotVerified") && (
                  <p> Email at dev@workverse to complete verification quickly.</p>
                )}
              </div> */}
            </>
          )}
        </Grid>

        {children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
