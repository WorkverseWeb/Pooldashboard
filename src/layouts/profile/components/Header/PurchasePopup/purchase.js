import React, { useState } from "react";
import "./purchase.css";
import typography from "assets/theme/base/typography";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Purchase = ({ onClose }) => {
  const [slots, setSlots] = useState("");

  const handleInputChange = (e) => {
    setSlots(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSlots("");

    toast.success("Slots Purchased");
  };

  const isSubmitDisabled = !slots;

  return (
    <div className="popup-container">
      <div className="popup-form">
        <div className="purchase-heading">
          <h4>Purchase Slots</h4>
          <span className="material-icons" onClick={onClose}>
            &times;
          </span>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="slots">For how many users?</label>
          <input type="number" name="slots" value={slots} onChange={handleInputChange} required />
          <div className="btn">
            <button
              type="submit"
              disabled={isSubmitDisabled}
              style={{
                cursor: isSubmitDisabled ? "not-allowed" : "pointer",
              }}
            >
              Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Purchase.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Purchase;
