import React, { useState } from "react";
import "./adduser.css";
import typography from "assets/theme/base/typography";
import PropTypes from "prop-types";

const AddUser = ({ onClose }) => {
  const { fontFamily } = typography;

  const [formData, setFormData] = useState({
    name: "",
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
      name: "",
      email: "",
      option: "cps",
    });
  };

  return (
    <div className="popup-container" style={{ fontFamily: fontFamily }}>
      <div className="popup-form">
        <div className="purchase-heading">
          <h4>Add User</h4>
          <span className="material-icons" onClick={onClose}>
            &times;
          </span>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{
              marginBottom: "15px",
            }}
          />

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
            <label>Skills:</label>
            <select
              name="option"
              value={formData.option}
              onChange={handleInputChange}
              style={{
                marginLeft: "20px",
              }}
            >
              <option value="cps">Creative Problem solving</option>
              <option value="em">Entrepreneurial Mindset</option>
              <option value="negotiation">Negotiation</option>
              <option value="story">Story-telling</option>
              <option value="fpt">First Principles Thinking</option>
              <option value="ei">Emotional Intelligencp</option>
              <option value="collab">Collaboration</option>
              <option value="src">Sharp Remote Communication</option>
              <option value="pm">Productivity Management</option>
            </select>
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

AddUser.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddUser;
