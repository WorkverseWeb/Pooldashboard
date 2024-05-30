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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function ComplexStatisticsCard({ color, title, count, percentage, icon, children }) {
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <MDBox
          variant="gradient"
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
          style={{
            background: "#021b215e",
            boxShadow:
              " 0rem 0.875rem 1.625rem -0.75rem rgba(186, 255, 247, 0.4),0rem 0.25rem 1.4375rem 0rem rgba(186, 255, 247, 0.15),0rem 0.5rem 0.625rem -0.3125rem rgba(186, 255, 247, 0.2)",
          }}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </MDBox>
        <MDBox
          textAlign="right"
          lineHeight={1.25}
          style={title === "Add user individually /upload csv file" ? { maxWidth: "150px" } : {}}
        >
          <MDTypography variant="button" fontWeight="light" color="text">
            {title}
          </MDTypography>
          <MDTypography variant="h4">{count}</MDTypography>
        </MDBox>
      </MDBox>
      <Divider />
      <MDBox pb={2} px={2}>
        {percentage && (
          <MDTypography component="p" variant="button" color="text" display="flex">
            <MDTypography
              component="span"
              variant="button"
              fontWeight="bold"
              color={percentage.color}
            >
              {percentage.amount}
            </MDTypography>
            {percentage.label && <>&nbsp;{percentage.label}</>}
          </MDTypography>
        )}
        {children && (
          <MDBox mt={1} display="flex" justifyContent="space-between">
            {children}
          </MDBox>
        )}
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
  children: PropTypes.node,
};

export default ComplexStatisticsCard;
