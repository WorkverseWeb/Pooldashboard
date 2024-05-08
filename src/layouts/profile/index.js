// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

import Login from "layouts/login";
import { useAuth0 } from "@auth0/auth0-react";
import brandDark from "assets/images/login-bg-img.png";

function Overview() {
  const { isAuthenticated } = useAuth0();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        mb={2}
        style={{
          backgroundImage: `url(${isAuthenticated ? "" : brandDark})`,
          backgroundSize: "cover",
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {isAuthenticated ? (
          <>
            <Header>
              <MDBox mt={5} mb={3}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6} xl={6}>
                    <h1>Hello</h1>
                  </Grid>
                </Grid>
                {/* Codespace */}
                {/* Codespace */}
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6} xl={6}>
                    <PlatformSettings />
                  </Grid>
                  <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
                    <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                    <ProfileInfoCard
                      title="profile information"
                      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                      info={{
                        fullName: "Ayan Pathak",
                        mobile: "(44) 123 1234 123",
                        email: "Ayan@workverse.in",
                        location: "India",
                      }}
                      social={[
                        {
                          link: "https://www.facebook.com/CreativeTim/",
                          icon: <FacebookIcon />,
                          color: "facebook",
                        },
                        {
                          link: "https://twitter.com/creativetim",
                          icon: <TwitterIcon />,
                          color: "twitter",
                        },
                        {
                          link: "https://www.instagram.com/creativetimofficial/",
                          icon: <InstagramIcon />,
                          color: "instagram",
                        },
                      ]}
                      action={{ route: "", tooltip: "Edit Profile" }}
                      shadow={false}
                    />
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
