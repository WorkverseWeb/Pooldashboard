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

import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

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

  const Job = ({ csp, em, nego, st, fpt, src, collab, ei, pm }) => {
    const skills = [];

    if (csp) skills.push("Creative Problem solving");
    if (em) skills.push("Negotiation");
    if (nego) skills.push("Collaboration");
    if (st) skills.push("First Principles Thinking");
    if (fpt) skills.push("Productivity Management");
    if (src) skills.push("Sharp Remote Communication");
    if (collab) skills.push("Collaboration");
    if (ei) skills.push("Emotional Intelligence");
    if (pm) skills.push("Productivity Management");

    const skillsString = skills.join(", ");

    return (
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
          {skillsString}
        </MDTypography>
        {/* <MDTypography variant="caption">{description}</MDTypography> */}
      </MDBox>
    );
  };

  const Branch = ({ cs, extc, aids, civil }) => {
    const branches = [];
    if (cs) branches.push("CS");
    if (extc) branches.push("EXTC");
    if (aids) branches.push("AIDS");
    if (civil) branches.push("CIVIL");

    return (
      <MDBox lineHeight={1} textAlign="center">
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          {branches}
        </MDTypography>
      </MDBox>
    );
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:8000/addusers")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    };

    fetchData();
  }, []);

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

    rows:
      data.length > 0
        ? data.map((user) => ({
            author: <Author name={user.name} email={user.email} />,
            group: <Branch cs={user.cs} extc={user.extc} aids={user.aids} civil={user.civil} />,
            function: (
              <Job
                csp={user.csp}
                em={user.em}
                nego={user.nego}
                st={user.st}
                fpt={user.fpt}
                src={user.src}
                collab={user.collab}
                ei={user.ei}
                pm={user.pm}
              />
            ),
            status: (
              <MDBox ml={-1}>
                <MDBadge badgeContent="offline" color="success" variant="gradient" size="sm" />
              </MDBox>
            ),
            employed: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {format(new Date(user.createdAt), "dd/MM/yyyy")}
              </MDTypography>
            ),
            action: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                Download
              </MDTypography>
            ),
          }))
        : [
            {
              author: (
                <MDTypography variant="caption" color="text">
                  Add users
                </MDTypography>
              ),
              group: null,
              function: null,
              status: null,
              employed: null,
              action: null,
            },
          ],
  };
}

// rows: [
//   {
//     author: <Author image={team2} name="Priyanka Shahasane" email="priyanka@workverse.in" />,
//     group: <Branch heading="Computer Science" />,
//     function: (
//       <Job
//         title="Creative Problem solving , Negotiation , Collaboration , First Principles
//     Thinking, Productivity Management , Emotional Intelligencp , Story-telling , Collaboration, Entrepreneurial Mindset"
//       />
//     ),
//     // description=""
//     status: (
//       <MDBox ml={-1}>
//         <MDBadge badgeContent="offline" color="success" variant="gradient" size="sm" />
//       </MDBox>
//     ),
//     employed: (
//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//         23/04/24
//       </MDTypography>
//     ),
//     action: (
//       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//         Download
//       </MDTypography>
//     ),
//   },
// ],
