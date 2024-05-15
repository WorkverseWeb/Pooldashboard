import React, { useState } from "react";
import "./user.css";
// import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import Grid from "@mui/material/Grid";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import MDBox from "components/MDBox";

import AddUser from "../adduser/adduser";

export default function UserHead() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <>
      <div className="user-container">
        {/* <Grid item xs={12} md={6} xl={3}>
        <DefaultInfoCard
          icon="account_balance"
          title="Total paid"
          description="One time payment"
          value="Rs. 34000/-"
        />
      </Grid>

      <Grid item xs={12} md={6} xl={3}>
        <DefaultInfoCard
          icon="account_balance"
          title="Total paid"
          description="One time payment"
          value="Rs. 34000/-"
        />
      </Grid> */}
        <Grid item xs={12} md={6} lg={3} style={{ width: "25%" }}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="weekend"
              title="User"
              count={50}
              percentage={{
                color: "success",
                amount: "0",
                label: "Active players",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3} style={{ width: "25%" }}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="person_add"
              title="Total Purchased Users"
              count="50"
              percentage={{
                color: "success",
                amount: "50",
                label: "Slots avalable",
              }}
            />
          </MDBox>
        </Grid>

        <Grid item xs={12} md={6} lg={3} style={{ width: "25%" }}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              //   color="primary"
              icon="person_add"
              //   count=""
              title="Add user individually /upload csv file"
            >
              <div style={{ display: "flex", gap: "20px" }}>
                <button
                  style={{
                    // marginRight: "8px",
                    padding: "8px 16px",
                    backgroundColor: "#0BB08C",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    width: "74px",
                  }}
                  onClick={toggleForm}
                >
                  Add
                </button>
                {isFormOpen && <AddUser onClose={toggleForm} />}
                <button
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#0BB08C",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Upload
                </button>
              </div>
            </ComplexStatisticsCard>
          </MDBox>
        </Grid>

        {/* <div>
        <button>Allocated slots</button>
        <button>Purchased slots</button>
        
        <button>Upload</button>
      </div> */}
      </div>
    </>
  );
}
