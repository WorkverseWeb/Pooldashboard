import React, { useState, useEffect } from "react";
import typography from "assets/theme/base/typography";
import "./doubtform.css";

export default function Doubtform() {
  const [issue, setIssue] = useState("");
  const [doubt, setDoubt] = useState("");

  const handleIssueChange = (e) => {
    setIssue(e.target.value);
  };

  const handleDoubtChange = (e) => {
    setDoubt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted:", { issue, doubt });

    setIssue("");
    setDoubt("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
          <label>Whats your issue?</label>
          <select value={issue} onChange={handleIssueChange}>
            <option value="Adding user">Issue in adding user</option>
            <option value="Payment">Issue in payment</option>
            <option value="Downloading WIP">Issue in downloading wip</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <textarea
            name="doubt"
            value={doubt}
            onChange={handleDoubtChange}
            placeholder="Kindly explain your problem"
            required
            rows="10"
            style={{ resize: "vertical" }}
          />
        </div>

        <div className="btn">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
