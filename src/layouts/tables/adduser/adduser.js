import React, { useState } from "react";
import "./adduser.css";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import typography from "assets/theme/base/typography";

const AddUser = ({ onClose }) => {
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

  const [branchClicked, setBranchClicked] = useState({
    cs: false,
    extc: false,
    aids: false,
    civil: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleButtonClick = (button) => {
    const newState = { ...isClicked, [button]: !isClicked[button] };
    setIsClicked(newState);
  };

  const handleBranchButtonClick = (button) => {
    const newBranch = {
      cs: false,
      extc: false,
      aids: false,
      civil: false,
      [button]: true,
    };
    setBranchClicked(newBranch);
  };

  const sendStateToBackend = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/addusers", data);
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isSelected =
        Object.values(isClicked).some((clicked) => clicked) ||
        Object.values(branchClicked).some((clicked) => clicked);
      if (!isSelected) {
        toast.error("Please select at least One.");
        return;
      }

      const response = await sendStateToBackend({ ...formData, ...isClicked, ...branchClicked });

      if (response.data.success) {
        // RESET
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

        setBranchClicked({
          cs: false,
          extc: false,
          aids: false,
          civil: false,
        });

        toast.success("User Added Successfully!");
      } else {
        // toast.error("Error adding User! Please try again later.");
        if (error.response && error.response.status === 409) {
          toast.error("User already added.");
        } else {
          toast.error("Error adding User! Please try again later.");
        }
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const isSubmitDisabled =
    !formData.name ||
    !formData.email ||
    !Object.values(isClicked).some((clicked) => clicked) ||
    !Object.values(branchClicked).some((clicked) => clicked);

  // select all
  const handleSelectAllClick = () => {
    const allSelected = Object.values(isClicked).every((value) => value);

    const newIsClicked = {};
    for (const skill in isClicked) {
      newIsClicked[skill] = !allSelected;
    }

    setIsClicked(newIsClicked);
  };

  return (
    <div className="add-container">
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

          <div className="select-btn" style={{}}>
            <div
              style={{ textAlign: "start", paddingLeft: "5px", fontFamily: typography.fontFamily }}
            >
              <label htmlFor="skills" style={{ fontSize: "15px" }}>
                Group :
              </label>
            </div>
            <button
              type="button"
              className={branchClicked.cs ? "branch-button clicked" : "branch-button"}
              onClick={() => handleBranchButtonClick("cs")}
            >
              Cs
            </button>
            <button
              type="button"
              className={branchClicked.extc ? "branch-button clicked" : "branch-button"}
              onClick={() => handleBranchButtonClick("extc")}
            >
              Extc
            </button>
            <button
              type="button"
              className={branchClicked.aids ? "branch-button clicked" : "branch-button"}
              onClick={() => handleBranchButtonClick("aids")}
            >
              Ai&ds
            </button>
            <button
              type="button"
              className={branchClicked.civil ? "branch-button clicked" : "branch-button"}
              onClick={() => handleBranchButtonClick("civil")}
            >
              Civil
            </button>
          </div>

          <div className="select-btn">
            <div
              style={{
                fontSize: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <label htmlFor="skills">Select :</label>
              <button
                type="button"
                className="audio-button"
                onClick={handleSelectAllClick}
                style={{
                  margin: "0",
                  color: "#fff",
                }}
              >
                {Object.values(isClicked).every((value) => value) ? "Deselect All" : "Select All"}
              </button>
            </div>

            <button
              type="button"
              className={isClicked.csp ? "audio-button clicked" : "audio-button"}
              onClick={() => handleButtonClick("csp")}
            >
              Creative Problem solving
            </button>
            <button
              type="button"
              className={isClicked.em ? "audio-button clicked" : "audio-button"}
              onClick={() => handleButtonClick("em")}
            >
              Entrepreneurial Mindset
            </button>
            <button
              type="button"
              className={isClicked.nego ? "audio-button clicked" : "audio-button"}
              onClick={() => handleButtonClick("nego")}
            >
              Negotiation
            </button>
            <button
              type="button"
              className={isClicked.st ? "audio-button clicked" : "audio-button"}
              onClick={() => handleButtonClick("st")}
            >
              Story-telling
            </button>
            <button
              type="button"
              className={isClicked.fpt ? "audio-button clicked" : "audio-button"}
              onClick={() => handleButtonClick("fpt")}
            >
              First Principles Thinking
            </button>

            <button
              type="button"
              className={isClicked.src ? "audio-button clicked" : "audio-button"}
              onClick={() => handleButtonClick("src")}
            >
              Sharp Remote Communication
            </button>
            <button
              type="button"
              className={isClicked.collab ? "audio-button clicked" : "audio-button"}
              onClick={() => handleButtonClick("collab")}
            >
              Collaboration
            </button>
            <button
              type="button"
              className={isClicked.ei ? "audio-button clicked" : "audio-button"}
              onClick={() => handleButtonClick("ei")}
            >
              Emotional Intelligence
            </button>

            <button
              type="button"
              className={isClicked.pm ? "audio-button clicked" : "audio-button"}
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
