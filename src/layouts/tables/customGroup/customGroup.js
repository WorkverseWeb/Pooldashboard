import React, { useState, useEffect } from "react";
import "./customGroup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import typography from "assets/theme/base/typography";

export default function CustomGroups() {
  const [departments, setDepartments] = useState([""]);
  const [initialDepartments, setInitialDepartments] = useState([]);

  useEffect(() => {
    const savedDepartments = localStorage.getItem("departments");
    if (savedDepartments) {
      const parsedDepartments = JSON.parse(savedDepartments);
      setDepartments(parsedDepartments);
      setInitialDepartments(parsedDepartments.filter((dept) => dept.trim() !== ""));
    } else {
      setDepartments([""]);
      setInitialDepartments([""]);
    }
  }, []);

  const handleAddDepartment = () => {
    if (departments.every((department) => department.trim() !== "")) {
      setDepartments([...departments, ""]);
    } else {
      toast.error("Please fill all fields before adding a new one.");
    }
  };

  const handleDepartmentChange = (index, value) => {
    const updatedDepartments = [...departments];
    updatedDepartments[index] = value;
    setDepartments(updatedDepartments);
  };

  const handleRemoveDepartment = (index) => {
    let newDepartments;
    if (departments.length === 1) {
      newDepartments = [""];
    } else {
      newDepartments = departments.filter((_, i) => i !== index);
    }

    localStorage.setItem("departments", JSON.stringify(newDepartments));

    setDepartments(newDepartments);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nonEmptyDepartments = departments.filter((dept) => dept.trim() !== "");
    if (nonEmptyDepartments.length !== departments.length) {
      toast.error("Please fill all fields before submitting.");
      return;
    }

    const uniqueDepartments = new Set(nonEmptyDepartments.map((dept) => dept.trim().toLowerCase()));
    if (uniqueDepartments.size !== nonEmptyDepartments.length) {
      toast.error("Duplicate group names are not allowed.");
      return;
    }

    if (
      initialDepartments.length === nonEmptyDepartments.length &&
      initialDepartments.every((dept, index) => dept === nonEmptyDepartments[index])
    ) {
      toast.error("No new group name added.");
      return;
    }

    const departmentsChanged =
      JSON.stringify(nonEmptyDepartments) !==
      JSON.stringify(initialDepartments.filter((dept) => dept.trim() !== ""));
    if (departmentsChanged) {
      localStorage.setItem("departments", JSON.stringify(nonEmptyDepartments));
      setInitialDepartments(nonEmptyDepartments);
      toast.success("Groups Saved!");
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

          <button
            type="submit"
            className="group-submit"
            style={{ fontFamily: typography.fontFamily }}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
