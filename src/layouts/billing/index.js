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
import React, { useState, useEffect } from "react";
import axios from "axios";

// React components
import MDBox from "components/MDBox";

// React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";

import Login from "layouts/login";
import { useAuth0 } from "@auth0/auth0-react";

function Billing() {
  const { user, isAuthenticated } = useAuth0();
  const [paymentStatus, setPaymentStatus] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [slotDetails, setSlotDetails] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchSlotDetails(user.email);
    }
  }, [isAuthenticated, user]);

  const fetchSlotDetails = async () => {
    try {
      const response = await axios.get(`BASE_URL/slots/${user.email}`);
      if (response.status === 200) {
        const data = response.data;

        const paymentStatus = data.AllProducts.paymentStatus;
        const totalAmt = data.TotalAmount;

        setTotalAmount(totalAmt); // Set totalAmount
        setPaymentStatus(paymentStatus); // Set paymentStatus
        setSlotDetails(data);
      }
    } catch (err) {
      console.error("Error fetching slot details:", err);

      setTotalAmount(0);
      setPaymentStatus(null);
      setSlotDetails(null);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
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
          <div>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <Grid container spacing={3} style={{ width: "100%", margin: "40px 0" }}>
                    {/* <Grid item xs={12} xl={6}>
                      <MasterCard number={4562112245947852} holder="Ayan Pathak" expires="11/22" />
                    </Grid> */}
                    <Grid item xs={12} xl={3}>
                      <DefaultInfoCard
                        icon="attach_money"
                        title="Total paid"
                        description="One time payment"
                        value={totalAmount}
                      />
                    </Grid>
                    <Grid item xs={12} xl={3}>
                      <DefaultInfoCard
                        icon="paypal"
                        title="paypal"
                        description="Payment method"
                        value={paymentStatus}
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
                      <PaymentMethod />
                    </Grid> */}
                    <Grid item xs={6}>
                      <Invoices />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MDBox>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                  {/* <BillingInformation /> */}
                </Grid>
                <Grid item xs={12} md={5}>
                  {/* <Transactions /> */}
                </Grid>
              </Grid>
            </MDBox>
          </div>
        ) : (
          <Login />
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
