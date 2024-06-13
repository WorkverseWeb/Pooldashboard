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
import projectsTableData from "layouts/tables/data/projectsTableData";

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

function Tables() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const { isAuthenticated } = useAuth0();
  const { columns, rows } = data({ selectedGroup });
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const handleSelectedGroupChange = (group) => {
    setSelectedGroup(group);
  };

  // allocate user
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
            <CustomGroups />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "30px 20px 20px",
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
                <button
                  style={{
                    padding: "9px 18px",
                    backgroundColor: "#021b215e",
                    color: "white",
                    border: "none",
                    borderRadius: "7px",
                    cursor: "pointer",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    boxShadow:
                      "0rem 0.875rem 1.625rem -0.75rem rgba(186, 255, 247, 0.4), 0rem 0.25rem 1.4375rem 0rem rgba(186, 255, 247, 0.15), 0rem 0.5rem 0.625rem -0.3125rem rgba(186, 255, 247, 0.2)",
                  }}
                  className="popup-btn"
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

                <button
                  style={{
                    padding: "9px 10px",
                    fontWeight: "600",
                    backgroundColor: "#021b215e",
                    color: "white",
                    border: "none",
                    borderRadius: "7px",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    boxShadow:
                      "0rem 0.875rem 1.625rem -0.75rem rgba(186, 255, 247, 0.4), 0rem 0.25rem 1.4375rem 0rem rgba(186, 255, 247, 0.15), 0rem 0.5rem 0.625rem -0.3125rem rgba(186, 255, 247, 0.2)",
                  }}
                  className="popup-btn"
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
                  {/* <span style={{ textTransform: "lowercase" }}> to assign</span> */}
                </button>
                {FormOpen && <UploadUser onClose={uploadForm} />}
              </div>
            </div>

            <Grid container pt={6} spacing={6}>
              <Grid item xs={12}>
                <Card>
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
                </Card>
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
