import React, { useState } from "react";
import "./uploaduser.css";
import typography from "assets/theme/base/typography";
import PropTypes from "prop-types";

const UploadUser = ({ onClose }) => {
  const { fontFamily } = typography;

  const [formData, setFormData] = useState({
    email: "",
    option: "cps",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({
      email: "",
      option: "cps",
    });
  };

  return (
    <div className="popup-container" style={{ fontFamily: fontFamily }}>
      <div className="popup-form">
        <div className="purchase-heading">
          <h4>Upload File</h4>
          <span className="material-icons" onClick={onClose}>
            &times;
          </span>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{
              marginBottom: "15px",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <button>Creative Problem solving</button>
            <button>Entrepreneurial Mindset</button>
            <button>Negotiation</button>
            <button>Story-telling</button>
            <button>First Principles Thinking</button>
            <button>Emotional Intelligenc</button>
            <button>Collaboration</button>
            <button>Sharp Remote Communication</button>
            <button>Productivity Management</button>
          </div>

          <div className="btn">
            <button type="submit" style={{ fontFamily: fontFamily }}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

UploadUser.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UploadUser;
