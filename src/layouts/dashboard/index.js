// @mui material components
import Grid from "@mui/material/Grid";
// import burceMars from "assets/images/bruce-mars.jpg";

// React components
import MDBox from "components/MDBox";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import PropTypes from "prop-types";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import { useAuth0 } from "@auth0/auth0-react";
// Dashboard components
import Projects from "layouts/dashboard/components/Projects";

// import Login from "login";

import React, { useState, useEffect } from "react";
import axios from "axios";

// images
import { BorderAllRounded } from "@mui/icons-material";
import Login from "layouts/login";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const { user, isAuthenticated } = useAuth0();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [slotDetails, setSlotDetails] = useState(null);
  const [slotsAvailable, setSlotsAvailable] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [userData, setUserData] = useState(null);
  // checking active users
  // const [activePlayers, setActivePlayers] = useState(0);

  // useEffect(() => {
  //   const fetchActivePlayers = async () => {
  //     return 0;
  //   };

  //   fetchActivePlayers().then((players) => {
  //     setActivePlayers(players);
  //   });
  // }, []);

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  const [data, setData] = useState([]);

  const CustomPercentageComponent = ({ label, amount, color }) => (
    <MDTypography component="p" variant="button" color="text" display="flex">
      {label && <>&nbsp;{label}</>}
      <MDTypography component="span" variant="button" fontWeight="bold" color={color}>
        &nbsp;{amount}
      </MDTypography>
    </MDTypography>
  );

  CustomPercentageComponent.propTypes = {
    label: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await axios.get("http://localhost:8000/assignUsers", {
            params: {
              authenticatedUserEmail: user.email,
            },
          });

          if (response.data.success) {
            setData(response.data.users);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.error("Error fetching assigned users:", error);
          // toast.error("Error fetching assigned users. Please try again later.");
        }
      }
    };

    if (isAuthenticated && user) {
      fetchData();
    }
  }, [isAuthenticated, user]);

  const totalCount = data.length;
  // console.log(totalCount);

  useEffect(() => {
    const fetchSlotDetails = async (email, totalCount) => {
      try {
        const response = await axios.get(`http://localhost:8000/slots/${user.email}`);
        // console.log("Response:", response);
        if (response.status === 200) {
          const data = response.data;

          // Calculate total quantity by summing up all quantities
          const quantities = Object.entries(data.AllProducts)
            .filter(([key, value]) => key !== "paymentStatus")
            .map(([key, value]) => value);
          const totalQty = quantities.reduce((acc, qty) => acc + qty, 0);

          setTotalQuantity(totalQty);

          const slotsAvailable = totalQty - totalCount;
          setSlotsAvailable(slotsAvailable);

          const totalPlayers = totalCount;
          setTotalPlayers(totalPlayers);

          setTotalAmount(data.TotalAmount);
          setSlotDetails(data);
        }
      } catch (err) {
        console.error("Error fetching slot details:", err);
        setTotalQuantity(0);
        setTotalAmount(0);
        setSlotDetails(null);
      }
    };
    if (isAuthenticated && user) {
      fetchSlotDetails(user.email, totalCount);
    }
  }, [isAuthenticated, user, totalCount]);

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
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        py={3}
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
            {userData && (
              <>
                <Grid container pt={4} pb={5} spacing={3} alignItems="center">
                  <Grid item>
                    <MDAvatar src={""} alt="profile-image" size="xl" shadow="sm" />
                  </Grid>
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
                </Grid>
              </>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="primary"
                    icon="person_add"
                    title="User"
                    count={totalPlayers}
                    percentage={{
                      color: "success",
                      amount: "0",
                      label: "Active players",
                    }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="primary"
                    icon="group_rounded"
                    title="Total Purchased Users"
                    count={totalQuantity}
                    percentage={{
                      color: "success",
                      amount: slotsAvailable,
                      label: "Slots avalable",
                    }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="primary"
                    icon="attach_money"
                    title="Total amount paid"
                    // count={totalAmount}
                    count={totalAmount}
                    percentageComponent={
                      <CustomPercentageComponent
                        color="success"
                        label="Paid Using"
                        amount="credit card"
                      />
                    }
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="primary"
                    icon="leaderboard"
                    title="WIP generated"
                    count="0"
                    percentage={{
                      color: "success",
                      amount: "0",
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
                            (<strong style={{ color: "rgb(156, 227, 37)" }}>+15%</strong>) increase
                            in today playtime.
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
                            (<strong style={{ color: "rgb(156, 227, 37)" }}>+15%</strong>) increase
                            in today chat-time.
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
