import React, { useState, useEffect } from "react";
import typography from "assets/theme/base/typography";
import "./doubtform.css";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function Doubtform() {
  const [issue, setIssue] = useState("");
  const [doubt, setDoubt] = useState("");
  const { user, isAuthenticated } = useAuth0();

  const handleIssueChange = (e) => {
    setIssue(e.target.value);
  };

  const handleDoubtChange = (e) => {
    setDoubt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming issue and doubt are controlled components managed by state
    const formData = {
      issue,
      doubt,
    };

    try {
      const response = await axios.post(`BASE_URL/api/issues/${user.email}`, formData);

      // Handle success
      console.log("Issue submitted:", response.data);
      toast.success("Issue submitted successfully");

      // Clear form fields if needed
      setIssue("");
      setDoubt("");
    } catch (error) {
      // Handle error
      console.error("Error submitting the issue:", error);
      toast.error("Error submitting the issue");
    }
  };

  // Enable/disable submit button based on form validity
  const isFormValid = () => {
    return issue !== "" && issue !== "Select" && doubt.trim() !== "";
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
          <label>Whats your issue?</label>
          <select value={issue} onChange={handleIssueChange}>
            <option value="Select">Select</option>
            <option value="Adding user">Issue in adding user</option>
            <option value="Payment">Issue in payment</option>
            <option value="Downloading WIP">Issue in downloading WIP</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <textarea
            name="doubt"
            value={doubt}
            onChange={handleDoubtChange}
            placeholder="Kindly explain your problem in brief"
            required
            rows="10"
            style={{ resize: "vertical" }}
          />
        </div>

        <div className="btn border-container">
          <button
            type="submit"
            className="border"
            disabled={!isFormValid()}
            style={{ cursor: isFormValid() ? "pointer" : "not-allowed" }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
