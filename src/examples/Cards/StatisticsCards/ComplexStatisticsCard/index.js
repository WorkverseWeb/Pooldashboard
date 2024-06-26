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
import boxShadow from "assets/theme/functions/boxShadow";

function ComplexStatisticsCard({
  color,
  title,
  count,
  percentage,
  icon,
  children,
  percentageComponent,
}) {
  return (
    <Card className="border-container-top">
      <div className="border-top" style={{ padding: "0" }}>
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
              background: "#0000006e",
              boxShadow: "none",
              // border: "1px solid #fff",
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
          {percentageComponent
            ? percentageComponent
            : percentage && (
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
      </div>
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
  percentageComponent: null,
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
  percentageComponent: PropTypes.node,
};

export default ComplexStatisticsCard;
