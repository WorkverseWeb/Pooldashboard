/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images

import logoBulb from "assets/images/small-logos/icon-bulb.png";

import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Company = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar name={name} size="sm" /> */}
      <MDTypography variant="button" fontWeight="regular" lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      {
        Header: "Skills",
        accessor: "companies",
        width: "45%",
        align: "left",
      },
      { Header: "Top players", accessor: "members", width: "10%", align: "left" },

      { Header: "completion", accessor: "completion", align: "center" },
    ],

    rows: [
      {
        companies: <Company name="Creative Problem solving" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team3, "Alexander Smith"],
            ])}
          </MDBox>
        ),

        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={100} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company name="Entrepreneurial Mindset" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team4, "Jessica Doe"],
              [team3, "Alexander Smith"],
              [team2, "Romina Hadid"],
              [team1, "Ryan Tompson"],
            ])}
          </MDBox>
        ),

        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={100} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company name="Negotiation" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team2, "Romina Hadid"],
              [team3, "Alexander Smith"],
              [team4, "Jessica Doe"],
            ])}
          </MDBox>
        ),

        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={60} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company name="Story-telling" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team2, "Romina Hadid"],
              [team4, "Jessica Doe"],
            ])}
          </MDBox>
        ),

        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={50} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company name="First Principles Thinking" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([[team4, "Jessica Doe"]])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            5
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={29} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company name="Emotional Intelligencp" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team4, "Jessica Doe"],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            2
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={25} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company name="Collaboration" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team2, "Romina Hadid"],
              [team4, "Jessica Doe"],
            ])}
          </MDBox>
        ),

        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={22} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company name="Sharp Remote Communication" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([[team4, "Jessica Doe"]])}
          </MDBox>
        ),

        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={20} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company name="Productivity Management" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team4, "Jessica Doe"],
            ])}
          </MDBox>
        ),

        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={5} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
    ],
  };
}
