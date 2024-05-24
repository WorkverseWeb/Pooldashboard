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
// import PopupForm from "./popup/feedback";

function Overview() {
  const { isAuthenticated } = useAuth0();
  return (
    <DashboardLayout>
      {/* <PopupForm /> */}
      <DashboardNavbar />
      <MDBox
        mb={2}
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
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6} xl={6}></Grid>
                </Grid>
                {/* Codespace */}
                {/* Codespace */}
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
                    <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                    <ProfileInfoCard
                      title="profile information"
                      description=""
                      info={{
                        fullName: "Priyanka",
                        mobile: "(+91) 9975008124",
                        email: "priyanka@workverse.in",
                        state: "Maharashtra",
                        city: "Mumbai",
                        location: "India",
                      }}
                      action={{ route: "", tooltip: "Edit Profile" }}
                      shadow={false}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} xl={6}>
                    <PlatformSettings />
                  </Grid>
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
