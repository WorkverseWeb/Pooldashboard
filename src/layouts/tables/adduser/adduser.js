import React, { useState } from "react";
import "./adduser.css";
import typography from "assets/theme/base/typography";
import PropTypes from "prop-types";

const AddUser = ({ onClose }) => {
  const { fontFamily } = typography;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [isClicked, setIsClicked] = useState({
    csp: false,
    em: false,
    nego: false,
    st: false,
    fpt: false,
    src: false,
    collab: false,
    ei: false,
    pm: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleButtonClick = (value) => {
    setIsClicked((prevClicked) => ({
      ...prevClicked,
      [value]: !prevClicked[value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isSelected = Object.values(isClicked).some((clicked) => clicked);
    if (!isSelected) {
      return;
    }

    setFormData({
      name: "",
      email: "",
    });

    setIsClicked({
      csp: false,
      em: false,
      nego: false,
      st: false,
      fpt: false,
      src: false,
      collab: false,
      ei: false,
      pm: false,
    });
  };

  const isSubmitDisabled = !Object.values(isClicked).some((clicked) => clicked);

  return (
    <div className="add-container" style={{ fontFamily: fontFamily }}>
      <div className="add-form">
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
            style={{ marginBottom: "15px" }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{ marginBottom: "10px" }}
          />

          <div className="select-btn">
            <div style={{ textAlign: "start", paddingLeft: "5px" }}>
              <label htmlFor="skills" style={{ fontSize: "15px" }}>
                Choose skills:
              </label>
            </div>

            <button
              type="button"
              className={isClicked.csp ? "button clicked" : "button"}
              onClick={() => handleButtonClick("csp")}
            >
              Creative Problem solving
            </button>
            <button
              type="button"
              className={isClicked.em ? "button clicked" : "button"}
              onClick={() => handleButtonClick("em")}
            >
              Entrepreneurial Mindset
            </button>
            <button
              type="button"
              className={isClicked.nego ? "button clicked" : "button"}
              onClick={() => handleButtonClick("nego")}
            >
              Negotiation
            </button>
            <button
              type="button"
              className={isClicked.st ? "button clicked" : "button"}
              onClick={() => handleButtonClick("st")}
            >
              Story-telling
            </button>
            <button
              type="button"
              className={isClicked.fpt ? "button clicked" : "button"}
              onClick={() => handleButtonClick("fpt")}
            >
              First Principles Thinking
            </button>

            <button
              type="button"
              className={isClicked.src ? "button clicked" : "button"}
              onClick={() => handleButtonClick("src")}
            >
              Sharp Remote Communication
            </button>
            <button
              type="button"
              className={isClicked.collab ? "button clicked" : "button"}
              onClick={() => handleButtonClick("collab")}
            >
              Collaboration
            </button>
            <button
              type="button"
              className={isClicked.ei ? "button clicked" : "button"}
              onClick={() => handleButtonClick("ei")}
            >
              Emotional Intelligence
            </button>

            <button
              type="button"
              className={isClicked.pm ? "button clicked" : "button"}
              onClick={() => handleButtonClick("pm")}
            >
              Productivity Management
            </button>
          </div>

          <div className="btn">
            <button
              type="submit"
              disabled={isSubmitDisabled}
              style={{
                cursor: isSubmitDisabled ? "not-allowed" : "pointer",
                fontFamily: fontFamily,
              }}
            >
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
