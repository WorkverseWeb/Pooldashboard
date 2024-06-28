// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Icon, IconButton } from "@mui/material";
import NewReleases from "@mui/icons-material/NewReleases";
import Verified from "@mui/icons-material/Verified";
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
  const [userData, setUserData] = useState(null);
  const { isAuthenticated, user } = useAuth0();
  const [image, setImage] = useState(null);

  const [isTextVisible, setIsTextVisible] = useState(false);

  const handleToggleText = () => {
    setIsTextVisible((prevState) => !prevState);
  };

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

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setImage(reader.result);
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //     uploadImage(file);
  //   }
  // };

  const fetchUserData = async () => {
    try {
      if (user && user.email) {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users?email=${user.email}`
        );
        // console.log("API Response:", response.data);

        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // toast.error("Error fetching user data");
    }
  };

  const fetchImageData = async () => {
    try {
      if (user && user.email) {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/upload/${user.email}`);
        setImage(response.data.imageUrl);
      }
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("email", user.email);

      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const { imageUrl } = response.data;
        setImage(imageUrl);

        console.log("Image uploaded and user updated successfully");

        fetchImageData();
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
      fetchImageData();
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
              src={image || user.img}
              alt="profile-image"
              size="xl"
              shadow="sm"
              style={{
                background: "#00000096",
                boxShadow: "none",
              }}
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

              <Grid item style={{ paddingTop: "0", marginLeft: "20px" }}>
                <MDTypography
                  variant="h6"
                  fontWeight="small"
                  style={{ fontSize: "14px", color: "#fff" }}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {userData.status && userData.status.includes("NotVerified") ? (
                      <>
                        <NewReleases
                          style={{ color: "red", marginRight: "5px", cursor: "pointer" }}
                          onClick={handleToggleText}
                        />
                        <span style={{ fontSize: "14px", fontWeight: "300" }}>
                          Verification Pending
                          <span className="loader" style={{ fontSize: "10px", marginLeft: "5px" }}>
                            <span style={{ fontSize: "30px", lineHeight: "0px" }}>.</span>
                            <span style={{ fontSize: "30px", lineHeight: "0px" }}>.</span>
                            <span style={{ fontSize: "30px", lineHeight: "0px" }}>.</span>
                          </span>
                        </span>
                        {isTextVisible && (
                          <span style={{ fontSize: "14px", marginLeft: "5px", fontWeight: "300" }}>
                            ( For a quick verification email us at dev@workverse.in )
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <Verified style={{ color: "rgb(156, 227, 37)", marginRight: "5px" }} />
                        <span style={{ color: "rgb(156, 227, 37)" }}>Verified</span>
                      </>
                    )}
                  </span>
                </MDTypography>
              </Grid>
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
