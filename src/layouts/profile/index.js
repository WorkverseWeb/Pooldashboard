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
import { toast } from "react-toastify";
// import PopupForm from "./popup/feedback";

function Overview() {
  const { isAuthenticated } = useAuth0();

  // fetching registerform data
  const [registerName, setRegisterName] = useState([]);

  useEffect(() => {
    const fetchRegisterName = async () => {
      try {
        const response = await axios.get("http://localhost:8000/register");
        console.log("API Response:", response.data);
        setRegisterName(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching Registration data");
      }
    };

    fetchRegisterName();
  }, []);

  if (!Array.isArray(registerName)) {
    console.error("API response is not an array:", registerName);
    return <div>Error: Unexpected data format</div>;
  }

  return (
    <DashboardLayout>
      {/* <PopupForm /> */}
      <DashboardNavbar />
      <MDBox
        pt={3}
        pb={3}
        style={
          !isAuthenticated
            ? {
                background:
                  "linear-gradient(45deg, rgb(5 74 25 / 9%) 30%, rgb(127 207 207 / 18%) 80%)",
                minHeight: "85vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                overflow: "hidden",
              }
            : {}
        }
      >
        {isAuthenticated ? (
          <>
            <Header>
              <MDBox mt={5} mb={3}>
                {/* <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} /> */}
                {registerName.length === 0 ? (
                  <div>No data available</div> // Handle empty data scenario
                ) : (
                  registerName.map((e) => (
                    <ProfileInfoCard
                      key={e._id}
                      title="profile information"
                      description=""
                      info={{
                        fullName: e.fullname,
                        mobile: "+91 " + e.number,
                        email: "priyanka@workverse",
                        organization: e.organization,
                        designation: e.designation,
                        state: e.state,
                        city: e.city,
                        location: "India",
                        linkedIn: e.linkedIn,
                      }}
                      action={{ route: "", tooltip: "Edit Profile" }}
                      shadow={false}
                    />
                  ))
                )}

                {/* fullname: "",
      number: "",
      organization: "",
      designation: "",
      state: "",
      city: "",
      linkedIn: "", */}

                <Grid item xs={12} mt={5} md={6} xl={6}>
                  <PlatformSettings />
                </Grid>
              </MDBox>
            </Header>
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
