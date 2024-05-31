/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* React - v2.2.0
=========================================================

* Product Page: https://www.workverse.in/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { Padding } from "@mui/icons-material";
import borders from "assets/theme/base/borders";

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography
          display="block"
          variant="button"
          fontWeight="medium"
          style={{ color: "#fff" }}
        >
          {name}
        </MDTypography>
        <MDTypography variant="caption" style={{ color: "#fff" }}>
          {email}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox
      lineHeight={1}
      textAlign="center"
      style={{
        maxWidth: "280px",
        whiteSpace: "normal",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
        style={{ lineHeight: "20px" }}
      >
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const Branch = ({ heading }) => (
    <MDBox lineHeight={1} textAlign="center">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {heading}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      {
        Header: "player",
        accessor: "author",
        width: "20%",
        align: "left",
      },
      { Header: "Group", accessor: "group", align: "center" },
      {
        Header: "skill",
        accessor: "function",
        align: "center",
        style: {
          maxWidth: "280px",
          whiteSpace: "normal",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "start date", accessor: "employed", align: "center" },
      { Header: "WIP", accessor: "action", align: "center" },
    ],

    rows: [
      {
        author: <Author image={team2} name="Priyanka Shahasane" email="priyanka@workverse.in" />,
        group: <Branch heading="Computer Science" />,
        function: (
          <Job
            title="Creative Problem solving , Negotiation , Collaboration , First Principles
        Thinking, Productivity Management , Emotional Intelligencp , Story-telling , Collaboration, Entrepreneurial Mindset"
          />
        ),
        // description=""
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/24
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Download
          </MDTypography>
        ),
      },
      {
        author: <Author image={team3} name="Tej Mandani" email="tej@workverse.in" />,
        group: <Branch heading="Computer Science" />,
        function: (
          <Job
            title="Entrepreneurial  Mindset, First Principles
        Thinking, Productivity Management ,"
          />
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/04/24
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Download
          </MDTypography>
        ),
      },
      {
        author: <Author image={team4} name="Rasika Lokhande" email="rasika@workverse.in" />,
        group: <Branch heading="IT" />,
        function: (
          <Job title="Negotiation , Story-telling , Collaboration, Entrepreneurial Mindset" />
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/04/24
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            In progress
          </MDTypography>
        ),
      },
      {
        author: <Author image={team3} name="Om Rane" email="om@workverse.in" />,
        group: <Branch heading="EXTC" />,
        function: <Job title="Story-telling" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/04/24
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            In progress
          </MDTypography>
        ),
      },
      {
        author: <Author image={team3} name="Subhajit Adhikari" email="subhajit@workverse.in" />,
        group: <Branch heading="AI" />,
        function: <Job title="First Principles Thinking" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/04/24
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            In progress
          </MDTypography>
        ),
      },
      {
        author: <Author image={team4} name="Wynona Cybil Alwyn" email="wynona@workverse.in" />,
        group: <Branch heading="civil" />,
        function: <Job title="Emotional Intelligence" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/04/24
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            In progress
          </MDTypography>
        ),
      },
      {
        author: <Author image={team4} name="Wynona Cybil Alwyn" email="wynona@workverse.in" />,
        group: <Branch heading="IT" />,
        function: <Job title="Collaboration " />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/04/24
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            In progress
          </MDTypography>
        ),
      },
      {
        author: <Author image={team4} name="Wynona Cybil Alwyn" email="wynona@workverse.in" />,
        group: <Branch heading="EXTC" />,
        function: <Job title="Sharp Remote  Communication" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/04/24
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            In progress
          </MDTypography>
        ),
      },
      {
        author: <Author image={team4} name="Wynona Cybil Alwyn" email="wynona@workverse.in" />,
        group: <Branch heading="Mechanical" />,
        function: <Job title="Productivity  Management" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/04/24
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            In progress
          </MDTypography>
        ),
      },
      {
        author: <Author image={team4} name="Wynona Cybil Alwyn" email="wynona@workverse.in" />,
        group: <Branch heading="Mechanical" />,
        function: <Job title="Productivity  Management" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/04/24
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            In progress
          </MDTypography>
        ),
      },
      {
        author: <Author image={team4} name="Wynona Cybil Alwyn" email="wynona@workverse.in" />,
        group: <Branch heading="Mechanical" />,
        function: <Job title="Productivity  Management" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/04/24
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            In progress
          </MDTypography>
        ),
      },
      {
        author: <Author image={team4} name="Wynona Cybil Alwyn" email="wynona@workverse.in" />,
        group: <Branch heading="Mechanical" />,
        function: <Job title="Productivity  " />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/04/24
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            In progress
          </MDTypography>
        ),
      },
      {
        author: <Author image={team4} name="Wynona Cybil Alwyn" email="wynona@workverse.in" />,
        group: <Branch heading="Mechanical" />,
        function: <Job title="Productivity  Management" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/04/24
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            In progress
          </MDTypography>
        ),
      },

      {
        author: <Author image={team4} name="Wynona Cybil Alwyn" email="wynona@workverse.in" />,
        group: <Branch heading="Mechanical" />,
        function: <Job title="Productivity  Management" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/04/24
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            In progress
          </MDTypography>
        ),
      },
    ],
  };
}
