import React, { useState } from "react";
import "./purchase.css";
import typography from "assets/theme/base/typography";
import PropTypes from "prop-types";

const Purchase = ({ onClose }) => {
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
          <label htmlFor="slots">For how many users?</label>
          <input type="number" name="slots" required />
        </form>
        <div className="btn">
          <button type="submit" style={{ fontFamily: fontFamily }}>
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

Purchase.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Purchase;
