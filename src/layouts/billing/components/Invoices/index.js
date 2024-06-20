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
import Card from "@mui/material/Card";

// React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Billing page components
import Invoice from "layouts/billing/components/Invoice";

function Invoices() {
  return (
    <Card sx={{ height: "100%" }} className="border-container-bottom">
      <div className="border-bottom">
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            Invoices
          </MDTypography>
          <div className="border-container-green">
            <MDButton
              variant="outlined"
              color="info"
              size="small"
              className="border-green"
              // style={{ color: "#9ce325", border: "1px solid #9ce325" }}
            >
              view all
            </MDButton>
          </div>
        </MDBox>
        <MDBox p={2}>
          <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
            {/*  <Invoice date="April, 22, 2024" id="#MS-415646" price="Rs. 4000/-" />
             <Invoice date="April, 20, 2024" id="#RV-126749" price="Rs. 300000/-" noGutter />
            <Invoice date="April, 20, 2024" id="#RV-126749" price="Rs. 300000/-" noGutter />
            <Invoice date="April, 20, 2024" id="#RV-126749" price="Rs. 300000/-" noGutter />
            <Invoice date="April, 20, 2024" id="#RV-126749" price="Rs. 300000/-" noGutter /> */}
            No Invoices Available
          </MDBox>
        </MDBox>
      </div>
    </Card>
  );
}

export default Invoices;
