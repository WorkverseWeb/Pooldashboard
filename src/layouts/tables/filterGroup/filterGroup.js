import React, { useState } from "react";
import "./filterGroup.css";
import typography from "assets/theme/base/typography";

export default function FilterGroup() {
  const [departments, setDepartments] = useState([""]);

  return (
    <div className="filter-container" style={{ fontFamily: typography.fontFamily }}>
      <select>
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
