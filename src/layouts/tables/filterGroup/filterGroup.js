import React, { useState, useEffect } from "react";
import "./filterGroup.css";
import typography from "assets/theme/base/typography";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import PropTypes from "prop-types";

function FilterGroup({ selectedGroup, onGroupChange }) {
  const [departments, setDepartments] = useState([""]);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        if (user && user.email) {
          const response = await axios.get(`http://localhost:8000/group/${user.email}`);
          if (response.status === 200 && response.data.groupname) {
            const dbDepartments = response.data.groupname.filter((dept) => dept.trim() !== "");
            setDepartments(dbDepartments);
          } else {
            setDepartments([]);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDepartments();
  }, [user]);

  const handleGroupChange = (event) => {
    const group = event.target.value;
    onGroupChange(group);
  };

  return (
    <div className="filter-container">
      <select
        style={{ fontFamily: typography.fontFamily, fontWeight: "600", textTransform: "uppercase" }}
        value={selectedGroup}
        onChange={handleGroupChange}
      >
        <option value="">Select Group</option>
        {departments.map((department, index) => (
          <option key={index} value={department}>
            {department}
          </option>
        ))}
      </select>
    </div>
  );
}

FilterGroup.propTypes = {
  selectedGroup: PropTypes.func.isRequired,
  onGroupChange: PropTypes.func.isRequired,
};

export default FilterGroup;
