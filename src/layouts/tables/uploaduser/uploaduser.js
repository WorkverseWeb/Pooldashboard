import React, { useState } from "react";
import "./uploaduser.css";
import typography from "assets/theme/base/typography";
import PropTypes from "prop-types";

const UploadUser = ({ onClose }) => {
  const { fontFamily } = typography;

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
    <div className="upload-container" style={{ fontFamily: fontFamily }}>
      <div className="upload-form">
        <div className="upload-heading">
          <h4>Upload File</h4>
          <span className="material-icons" onClick={onClose}>
            &times;
          </span>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="select-btn">
            <div style={{ textAlign: "start", paddingLeft: "10px", fontSize: "15px" }}>
              <label htmlFor="skills">Choose skills:</label>
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

          <label htmlFor="fileSelect">Upload</label>
          <input
            id="fileSelect"
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />

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

UploadUser.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UploadUser;
