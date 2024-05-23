import React, { useState, useEffect } from "react";
import "./customGroup.css";

export default function CustomGroups() {
  useEffect(() => {
    const savedDepartments = localStorage.getItem("departments");
    if (savedDepartments) {
      setDepartments(JSON.parse(savedDepartments));
    }
  }, []);

  const [departments, setDepartments] = useState([""]);
  const [departmentData, setDepartmentData] = useState([]);
  const [error, setError] = useState("");

  const handleAddDepartment = () => {
    if (departments.every((department) => department.trim() !== "")) {
      setDepartments([...departments, ""]);
      setError("");
    } else {
      setError("Please fill all fields before adding a new one.");
    }
  };

  const handleDepartmentChange = (index, value) => {
    const updatedDepartments = [...departments];
    updatedDepartments[index] = value;
    setDepartments(updatedDepartments);
    setError("");
  };

  const handleRemoveDepartment = (index) => {
    if (departments.length > 1) {
      setDepartments(departments.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueDepartments = new Set(departments.map((dept) => dept.trim().toLowerCase()));
    if (uniqueDepartments.size !== departments.length) {
      setError("Duplicate group names are not allowed.");
    } else {
      setError("");
      const nonEmptyDepartments = departments.filter((dept) => dept.trim() !== "");
      setDepartmentData(nonEmptyDepartments);
      console.log("Groups submitted:", nonEmptyDepartments);
      // Save departments to localStorage
      localStorage.setItem("departments", JSON.stringify(nonEmptyDepartments));
    }
  };

  return (
    <div className="group-container">
      <div className="col1">
        <p>50 Total Purchased Slots.</p>
        <p>34 Slots Available. </p>
        <p>14 Total Players.</p>
      </div>

      <div className="col2">
        <form onSubmit={handleSubmit}>
          <div className="departments-wrapper">
            {departments.map((department, index) => (
              <div key={index} className="department-item">
                <input
                  type="text"
                  placeholder="Add Group"
                  value={department}
                  onChange={(e) => handleDepartmentChange(index, e.target.value)}
                  style={{ width: department ? `${department.length + 2}ch` : "100px" }}
                />
                {department && (
                  <button className="btn1" onClick={() => handleRemoveDepartment(index)}>
                    -
                  </button>
                )}
                {index === departments.length - 1 && (
                  <button className="btn2" onClick={handleAddDepartment}>
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="group-submit">
            <span role="img" aria-label="Save">
              Save
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
