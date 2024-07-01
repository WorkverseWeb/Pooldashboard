/**
=========================================================
* React - v2.2.0
=========================================================


* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)


Coded by www.creative-tim.com


 =========================================================


* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// mui
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";

// React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/tables/data/authorsTableData";

import Login from "layouts/login";
import { useAuth0 } from "@auth0/auth0-react";
import Feedback2 from "./feedbackform/feedback2";
import Feedback3 from "./feedbackform/feedback3";

import React, { useState, useEffect } from "react";
import AddUser from "./adduser/adduser";
import typography from "assets/theme/base/typography";
import UploadUser from "./uploaduser/uploaduser";
import CustomGroups from "./customGroup/customGroup";
import FilterGroup from "./filterGroup/filterGroup";
import axios from "axios";

function Tables() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const { isAuthenticated, user } = useAuth0();
  const { columns, rows } = data({ selectedGroup });

  const [userData, setUserData] = useState([]);
  const [showFeedback2, setShowFeedback2] = useState(false);
  const [showFeedback3, setShowFeedback3] = useState(false);

  const handleSelectedGroupChange = (group) => {
    setSelectedGroup(group);
  };

  // allocate user
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [FormOpen, setFormOpen] = useState(false);
  const [userStatus, setUserStatus] = useState(null);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const uploadForm = () => {
    setFormOpen(!FormOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/assignUsers`, {
            params: {
              authenticatedUserEmail: user.email,
            },
          });

          if (response.data.success) {
            const wipData = response.data.users.map((user) => user.auWIP);
            // console.log("wip", wipData);
            setUserData(wipData);
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user && user.email) {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/users?email=${user.email}`
          );
          // console.log("API Response:", response.data);
          setUserStatus(response.data);
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

  useEffect(() => {
    if (userData.length === 0) return;

    const generatedCount = userData.filter((wip) => wip.includes("generated")).length;
    const generatedPercentage = (generatedCount / userData.length) * 100;

    if (generatedCount === userData.length) {
      setShowFeedback2(false);

      const oneMonth = 30 * 24 * 60 * 60 * 1000;

      const completionTime = new Date(userData[userData.length - 1].timestamp).getTime() + oneMonth;

      const currentTime = new Date().getTime();

      const delay = completionTime - currentTime;

      const delayInHours = 720;
      const delayInMilliseconds = delayInHours * 60 * 60 * 1000;

      if (delay > delayInMilliseconds) {
        const timer = setTimeout(() => {
          setShowFeedback3(true);
        }, delayInMilliseconds);

        return () => clearTimeout(timer);
      } else {
        setShowFeedback3(true);
      }
    } else if (generatedPercentage >= 70) {
      setShowFeedback2(true);
    } else {
      setShowFeedback2(false);
    }
  }, [userData]);

  return (
    <DashboardLayout>
      {isAuthenticated && (
        <>
          {showFeedback2 && <Feedback2 />}
          {showFeedback3 && <Feedback3 />}
        </>
      )}
      <DashboardNavbar />

      <MDBox
        pt={4}
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
          userStatus && userStatus.status == "NotVerified" ? (
            <MDBox
              px={3}
              pb={3}
              style={{
                width: "100%",
                height: "500px",
                backgroundColor: "#0000006e",
                backdropFilter: "blur(7px)",
                borderRadius: "8px",
              }}
              className="border-container-top"
            >
              <div className="border-top" style={{ padding: "0" }}>
                <MDTypography
                  variant="h5"
                  color="text"
                  fontWeight="light"
                  style={{ marginBottom: "10px" }}
                >
                  Verification Pending{" "}
                  <span className="loader">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </MDTypography>
                <MDTypography variant="body1" color="text" style={{ fontSize: "14px" }}>
                  To see this page contents first verify your account . For a quick verification
                  email us at dev@workverse.in{" "}
                  <span>. If already done , please wait for approval.</span>
                </MDTypography>
              </div>
            </MDBox>
          ) : (
            <>
              <CustomGroups />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "40px 20px",
                }}
              >
                <FilterGroup
                  setSelectedGroup={setSelectedGroup}
                  onGroupChange={handleSelectedGroupChange}
                />

                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "center",
                  }}
                >
                  <div className="border-container">
                    <button
                      style={{
                        padding: "9px 18px",
                        fontWeight: "600",
                      }}
                      className="popup-btn border"
                      onClick={toggleForm}
                    >
                      <IconButton
                        size="small"
                        disableRipple
                        color="inherit"
                        aria-controls="add"
                        aria-haspopup="true"
                        variant="contained"
                        style={{ padding: "0 ", marginRight: "7px" }}
                      >
                        <Icon>add_outlined</Icon>
                      </IconButton>
                      assign user
                    </button>
                    {isFormOpen && <AddUser onClose={toggleForm} />}
                  </div>
                  <div className="border-container">
                    <button
                      style={{
                        padding: "9px 10px",
                        fontWeight: "600",
                      }}
                      className="popup-btn border"
                      onClick={uploadForm}
                    >
                      <IconButton
                        size="small"
                        disableRipple
                        color="inherit"
                        aria-controls="upload"
                        aria-haspopup="true"
                        variant="contained"
                        style={{ padding: "0 2px" }}
                      >
                        <Icon>file_upload_outlined</Icon>
                      </IconButton>
                      Upload to assign
                    </button>
                    {FormOpen && <UploadUser onClose={uploadForm} />}
                  </div>
                </div>
              </div>

              <Grid container spacing={6} style={{ marginTop: "0" }}>
                <Grid item xs={12} style={{ paddingTop: "0" }}>
                  <Card className="border-container-box">
                    <div className="border-box">
                      <MDBox pt={3}>
                        <DataTable
                          table={{ columns, rows }}
                          isSorted={false}
                          entriesPerPage={false}
                          showTotalEntries={true}
                          noEndBorder
                        />
                        {/* <Data selectedGroup={selectedGroup} /> */}
                      </MDBox>
                    </div>
                  </Card>
                </Grid>
              </Grid>
            </>
          )
        ) : (
          <Login />
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
