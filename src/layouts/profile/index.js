// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// React components
import MDBox from "components/MDBox";

// React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

import Login from "layouts/login";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useState, useEffect } from "react";

function Overview() {
  const { isAuthenticated, user } = useAuth0();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
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

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, user]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        pb={3}
        style={
          !isAuthenticated
            ? {
                background: "linear-gradient(45deg, rgb(0 0 0 / 7%) 30%, rgb(0 0 0 / 56%) 80%)",
                backdropFilter: "blur(8px)",
                minHeight: "85vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                overflow: "hidden",
                marginBottom: "20px",
              }
            : {}
        }
      >
        {isAuthenticated ? (
          <>
            <Header />
            <MDBox mb={3}>
              {/* <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} /> */}
              {userData ? (
                <ProfileInfoCard
                  // title="profile information"
                  description=""
                  info={{
                    fullName: userData.fullName,
                    mobile: "+91 " + userData.number,
                    email: userData.email,
                    // creatingFor: userData.poolForCreator,
                    organization: userData.organization,
                    designation: userData.designation,
                    state: userData.state,
                    city: userData.city,
                    location: "India",
                    // linkedIn: userData.linkedInURL,
                  }}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
              ) : (
                <div>Loading...</div>
              )}
              <Grid item xs={12} mt={5} md={6} xl={6}>
                <PlatformSettings />
              </Grid>
            </MDBox>
          </>
        ) : (
          <Login />
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
