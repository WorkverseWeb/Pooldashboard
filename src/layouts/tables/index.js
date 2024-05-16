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
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import Login from "layouts/login";
import { useAuth0 } from "@auth0/auth0-react";
import Feedback2 from "./feedbackform/feedback2";
import Feedback3 from "./feedbackform/feedback3";

import React, { useState } from "react";
import AddUser from "./adduser/adduser";
import typography from "assets/theme/base/typography";
import UploadUser from "./uploaduser/uploaduser";

function Tables() {
  const { isAuthenticated } = useAuth0();
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const { fontFamily } = typography;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [FormOpen, setFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const uploadForm = () => {
    setFormOpen(!FormOpen);
  };

  return (
    <DashboardLayout>
      {/* <Feedback2 />
      <Feedback3 /> */}

      <DashboardNavbar />

      <MDBox
        pt={6}
        pb={3}
        style={{
          background: isAuthenticated
            ? "none"
            : " linear-gradient(45deg, rgb(5 74 25 / 9%) 30%, rgb(127 207 207 / 18%) 80%)",
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
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Card>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "20px",
                      fontFamily: fontFamily,
                    }}
                  >
                    <p style={{ color: "#fff", fontWeight: "300", fontSize: "15px" }}>
                      50 Slots Available from 50.
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "center",
                      }}
                    >
                      <button
                        style={{
                          padding: "9px 18px",
                          backgroundColor: "#0BB08C",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontWeight: "500",
                          fontFamily: fontFamily,
                          textTransform: "uppercase",
                        }}
                        onClick={toggleForm}
                      >
                        <IconButton
                          size="small"
                          disableRipple
                          color="inherit"
                          aria-controls="add"
                          aria-haspopup="true"
                          variant="contained"
                          style={{ padding: "0 ", marginRight: "3px" }}
                        >
                          <Icon>add_outlined</Icon>
                        </IconButton>
                        Add
                      </button>
                      {isFormOpen && <AddUser onClose={toggleForm} />}

                      <button
                        style={{
                          padding: "9px 10px",
                          fontWeight: "500",
                          backgroundColor: "#0BB08C",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontFamily: fontFamily,
                          textTransform: "uppercase",
                        }}
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
                        Upload
                      </button>
                      {FormOpen && <UploadUser onClose={uploadForm} />}
                    </div>
                  </div>

                  <MDBox pt={3}>
                    <DataTable
                      table={{ columns, rows }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    />
                  </MDBox>
                </Card>
              </Grid>
              <Grid item xs={12}>
                {/* <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card> */}
              </Grid>
            </Grid>
          </>
        ) : (
          <Login />
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
