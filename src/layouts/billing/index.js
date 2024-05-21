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
  const { isAuthenticated } = useAuth0();
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
          <>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <Grid container spacing={3}>
                    {/* <Grid item xs={12} xl={6}>
                      <MasterCard number={4562112245947852} holder="Ayan Pathak" expires="11/22" />
                    </Grid> */}
                    <Grid item xs={12} xl={6}>
                      <DefaultInfoCard
                        icon="account_balance"
                        title="Total paid"
                        description="One time payment"
                        value="Rs. 34000/-"
                      />
                    </Grid>
                    <Grid item xs={12} xl={6}>
                      <DefaultInfoCard
                        icon="paypal"
                        title="paypal"
                        description="Payment method"
                        value="Sucess"
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
                      <PaymentMethod />
                    </Grid> */}
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <Invoices />
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
          </>
        ) : (
          <Login />
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
