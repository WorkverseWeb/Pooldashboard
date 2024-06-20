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

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import typography from "assets/theme/base/typography";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Diversity1 } from "@mui/icons-material";

function PlatformSettings() {
  // const [followsMe, setFollowsMe] = useState(true);
  // const [answersPost, setAnswersPost] = useState(true);
  // const [mentionsMe, setMentionsMe] = useState(true);
  // const [newLaunches, setNewLaunches] = useState(false);
  // const [productUpdate, setProductUpdate] = useState(false);
  // const [newsletter, setNewsletter] = useState(false);

  const [preferences, setPreferences] = useState({});
  const [formChanged, setFormChanged] = useState(false);
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const fetchPreferences = async () => {
      const defaultPreferences = {
        totalInactive: true,
        totalChatting: true,
        totalFinishedGame: true,
        yesToLevelNotification: false,
        yesToProductUpdate: false,
        yesToSubscribeNewsletter: false,
      };

      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/preferences/${user.email}`);
        setPreferences({ ...defaultPreferences, ...response.data });
      } catch (error) {
        console.error("Error fetching user preferences:", error);
        setPreferences(defaultPreferences);
      }
    };

    if (isAuthenticated) {
      fetchPreferences();
    }
  }, [isAuthenticated, user.email]);

  const handleCheckboxChange = (key) => {
    setPreferences((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
    setFormChanged(true);
  };

  const handleSavePreferences = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/preferences/${user.email}`, preferences);
      setFormChanged(false);
    } catch (error) {
      console.error("Error saving user preferences:", error);
    }
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
      }}
      className="border-container-top"
    >
      <div className="border-top">
        <MDBox p={2}>
          <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            platform settings
          </MDTypography>
        </MDBox>
        <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
          <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
            account
          </MDTypography>
          <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
            <MDBox mt={0.5}>
              <Switch
                checked={preferences.totalInactive}
                onChange={() => handleCheckboxChange("totalInactive")}
              />
            </MDBox>
            <MDBox width="80%" ml={0.5}>
              <MDTypography variant="button" fontWeight="regular" color="text">
                Email me when someone is inactive
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
            <MDBox mt={0.5}>
              <Switch
                checked={preferences.totalChatting}
                onChange={() => handleCheckboxChange("totalChatting")}
              />
            </MDBox>
            <MDBox width="80%" ml={0.5}>
              <MDTypography variant="button" fontWeight="regular" color="text">
                Email me when someone is not interacting with Neuroda
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
            <MDBox mt={0.5}>
              <Switch
                checked={preferences.totalFinishedGame}
                onChange={() => handleCheckboxChange("totalFinishedGame")}
              />
            </MDBox>
            <MDBox width="80%" ml={0.5}>
              <MDTypography variant="button" fontWeight="regular" color="text">
                Email me when someone finish the game
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox mt={3}>
            <MDTypography
              variant="caption"
              fontWeight="bold"
              color="text"
              textTransform="uppercase"
            >
              application
            </MDTypography>
          </MDBox>
          <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
            <MDBox mt={0.5}>
              <Switch
                checked={preferences.yesToLevelNotification}
                onChange={() => handleCheckboxChange("yesToLevelNotification")}
              />
            </MDBox>
            <MDBox width="80%" ml={0.5}>
              <MDTypography variant="button" fontWeight="regular" color="text">
                New level is added
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
            <MDBox mt={0.5}>
              <Switch
                checked={preferences.yesToProductUpdate}
                onChange={() => handleCheckboxChange("yesToProductUpdate")}
              />
            </MDBox>
            <MDBox width="80%" ml={0.5}>
              <MDTypography variant="button" fontWeight="regular" color="text">
                Monthly product updates
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
            <MDBox mt={0.5}>
              <Switch
                checked={preferences.yesToSubscribeNewsletter}
                onChange={() => handleCheckboxChange("yesToSubscribeNewsletter")}
              />
            </MDBox>
            <MDBox width="80%" ml={0.5}>
              <MDTypography variant="button" fontWeight="regular" color="text">
                Subscribe to newsletter
              </MDTypography>
            </MDBox>
          </MDBox>

          {formChanged && (
            <div className="border-container" style={{ marginTop: "25px" }}>
              <button
                style={{
                  fontFamily: typography.fontFamily,
                }}
                className="border"
                onClick={handleSavePreferences}
              >
                Save
              </button>
            </div>
          )}
        </MDBox>
      </div>
    </Card>
  );
}

export default PlatformSettings;
