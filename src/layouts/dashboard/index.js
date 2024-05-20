// @mui material components
import Grid from "@mui/material/Grid";
import burceMars from "assets/images/bruce-mars.jpg";

// React components
import MDBox from "components/MDBox";

// React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import { useAuth0 } from "@auth0/auth0-react";
// Dashboard components
import Projects from "layouts/dashboard/components/Projects";

// import Login from "login";

import React, { useState, useEffect } from "react";

// images
import brandDark from "assets/images/registration-bg-img.jpg";
import { BorderAllRounded } from "@mui/icons-material";
import Login from "layouts/login";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const { user, isAuthenticated, isLoading } = useAuth0();

  // checking active users
  const [activePlayers, setActivePlayers] = useState(0);

  useEffect(() => {
    const fetchActivePlayers = async () => {
      return 0;
    };

    fetchActivePlayers().then((players) => {
      setActivePlayers(players);
    });
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        py={3}
        style={{
          background: isAuthenticated
            ? "none"
            : " linear-gradient(45deg, rgb(5 74 25 / 9%) 30%, rgb(127 207 207 / 18%) 80%)",
          minHeight: "85vh",
          borderRadius: "10px",
          overflow: "hidden",
          display: isAuthenticated ? "block" : "flex",
          justifyContent: isAuthenticated ? "initial" : "center",
          alignItems: isAuthenticated ? "initial" : "center",
        }}
      >
        {isAuthenticated ? (
          <>
            <Grid container py={5} spacing={3} alignItems="center">
              <Grid item>
                <MDAvatar src={burceMars} alt="profile-image" size="xl" shadow="sm" />
              </Grid>
              <Grid item>
                <MDBox height="100%" mt={0.5} lineHeight={1}>
                  <MDTypography variant="h5" fontWeight="medium">
                    {/* Ayan Pathak */}
                    {user.nickname}
                  </MDTypography>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    CSA | Workverse University
                  </MDTypography>
                </MDBox>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="primary"
                    icon="weekend"
                    title="User"
                    count={281}
                    percentage={{
                      color: "success",
                      amount: "81",
                      label: "Active players",
                    }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="primary"
                    icon="person_add"
                    title="Total Purchased Users"
                    count="300"
                    percentage={{
                      color: "success",
                      amount: "19",
                      label: "Slots avalable",
                    }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="primary"
                    icon="store"
                    title="Total amount paid"
                    count="34k"
                    percentage={{
                      color: "success",
                      amount: "Paid",
                      label: "Using credit card",
                    }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="primary"
                    icon="leaderboard"
                    title="WIP generated"
                    count="91"
                    percentage={{
                      color: "success",
                      amount: "103",
                      label: "Finished the game this month",
                    }}
                  />
                </MDBox>
              </Grid>
            </Grid>

            {/* {activePlayers > 0 ? ( */}
            <>
              <MDBox mt={4.5}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={4}>
                    <MDBox mb={3}>
                      <ReportsBarChart
                        color="success"
                        title="Active Users"
                        description="Last week Performance"
                        date="sent 2 days ago"
                        chart={reportsBarChartData}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <MDBox mb={3}>
                      <ReportsLineChart
                        color="success"
                        title="Monthly User Game Time"
                        description={
                          <>
                            (<strong>+15%</strong>) increase in today playtime.
                          </>
                        }
                        date="updated 4 min ago"
                        chart={sales}
                      />
                    </MDBox>
                  </Grid>
                  {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Game complition this week"
                  description="Last week Performance"
                  date="sent 1 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid> */}
                  <Grid item xs={12} md={6} lg={4}>
                    <MDBox mb={3}>
                      <ReportsLineChart
                        color="success"
                        title="Monthly time spend with Neuroda"
                        description={
                          <>
                            (<strong>+15%</strong>) increase in today chat-time.
                          </>
                        }
                        date="updated 4 min ago"
                        chart={sales}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={8}>
                    <Projects />
                  </Grid>
                  {/* <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid> */}
                </Grid>
              </MDBox>
            </>
            {/* ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // minHeight: "50vh",
                  padding: "30px 0",
                }}
              >
                Currently, there are no Players who started their game. Please check back later !
              </div>
            )} */}
          </>
        ) : (
          <Login />
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
