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

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function DefaultInfoCard({ color, icon, title, description, value }) {
  return (
    <Card className="border-container-bottom">
      <div className="border-bottom">
        <MDBox p={2} mx={3} display="flex" justifyContent="center">
          <MDBox
            display="grid"
            justifyContent="center"
            alignItems="center"
            color="white"
            width="4rem"
            height="4rem"
            borderRadius="lg"
            variant="gradient"
            style={{ backgroundColor: "#0000006e" }}
          >
            <Icon fontSize="default">{icon}</Icon>
          </MDBox>
        </MDBox>
        <MDBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            {title}
          </MDTypography>
          {description && (
            <MDTypography variant="caption" color="text" fontWeight="regular">
              {description}
            </MDTypography>
          )}
          {description && !value ? null : <Divider />}
          {value && (
            <MDTypography variant="h5" fontWeight="medium" style={{ color: "rgb(156, 227, 37)" }}>
              {value}
            </MDTypography>
          )}
        </MDBox>
      </div>
    </Card>
  );
}

// Setting default values for the props of DefaultInfoCard
DefaultInfoCard.defaultProps = {
  color: "info",
  value: "",
  description: "",
};

// Typechecking props for the DefaultInfoCard
DefaultInfoCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DefaultInfoCard;
