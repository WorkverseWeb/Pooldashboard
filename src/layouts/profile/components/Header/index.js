import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// import AppBar from "@mui/material/AppBar";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
import { Icon, IconButton } from "@mui/material";

// React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// React base styles
import breakpoints from "assets/theme/base/breakpoints";

import backgroundImage from "assets/images/bg-profile.jpeg";

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

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="6rem"
        borderRadius="xl"
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
        style={{ background: "transparent", border: "0", boxShadow: "none" }}
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
            <MDAvatar src={image} alt="profile-image" size="xl" shadow="sm" />
          </Grid>

          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                NMIMS
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                Priyanka | Tech Architech
              </MDTypography>
            </MDBox>
          </Grid>

          <div
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
                Verification Pending...
              </span>
            </MDTypography>

            {/* <MDTypography variant="h6" fontWeight="small"   style={{
                fontSize: "14px",
              }}>
              Status :
              <span style={{ color: "#fff", fontWeight: "400",marginLeft: "5px" }}> Verified.</span>
            </MDTypography> */}

            <p> Email at dev@workverse to complete verification quickly.</p>
          </div>
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
