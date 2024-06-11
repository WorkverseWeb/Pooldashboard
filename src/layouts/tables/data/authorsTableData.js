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
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function data({ selectedGroup }) {
  const Author = ({ image, auName, auEmail }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={auName} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography
          display="block"
          variant="button"
          fontWeight="medium"
          style={{ color: "#fff" }}
        >
          {auName}
        </MDTypography>
        <MDTypography variant="caption" style={{ color: "#fff" }}>
          {auEmail}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ auSkills }) => {
    const skillsString = auSkills.join(", ");

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

  const Branch = ({ auGroup }) => {
    return (
      <MDBox lineHeight={1} textAlign="center">
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          {auGroup}
        </MDTypography>
      </MDBox>
    );
  };

  const [data, setData] = useState([]);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await axios.get("http://localhost:8000/assignUsers", {
            params: {
              authenticatedUserEmail: user.email,
            },
          });

          if (response.data.success) {
            setData(response.data.users);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.error("Error fetching assigned users:", error);
          toast.error("Error fetching assigned users. Please try again later.");
        }
      }
    };

    if (isAuthenticated && user) {
      fetchData();
    }
  }, [isAuthenticated, user]);

  const filteredData = selectedGroup ? data.filter((user) => user.auGroup === selectedGroup) : data;

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
      filteredData.length > 0
        ? filteredData.map((user) => ({
            author: <Author auName={user.auName} auEmail={user.auEmail} />,
            group: <Branch auGroup={user.auGroup} />,
            function: <Job auSkills={user.auSkills} />,
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
