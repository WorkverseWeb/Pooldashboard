import React, { useState } from "react";
import "./adduser.css";
import typography from "assets/theme/base/typography";
import PropTypes from "prop-types";

const AddUser = ({ onClose }) => {
  const { fontFamily } = typography;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="popup-container" style={{ fontFamily: fontFamily }}>
      <div className="popup-form">
        <div className="purchase-heading">
          <h4>Purchase Slots</h4>
          <span className="material-icons" onClick={onClose}>
            &times;
          </span>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" required />

          <input type="email" name="email" placeholder="Email" required />
        </form>
        <div className="btn">
          <button type="submit" style={{ fontFamily: fontFamily }}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

AddUser.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddUser;
