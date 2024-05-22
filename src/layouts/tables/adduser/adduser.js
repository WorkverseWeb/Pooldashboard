import React, { useState } from "react";
import "./adduser.css";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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
    mech: false,
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
      mech: false,
      [button]: true,
    };
    setBranchClicked(newBranch);
  };

  // const sendStateToBackend = async (data) => {
  //   try {
  //     const response = await axios.post("http://localhost:8000/api/addusers", data);
  //     return response;
  //   } catch (error) {
  //     console.error("Error during API call:", error);
  //     throw error;
  //   }
  // };

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

        setIsClicked({
          cs: false,
          extc: false,
          aids: false,
          civil: false,
          mech: false,
        });

        toast.success("User Added Successfully!");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Error adding User! Please try again later.");
      // if (error.response && error.response.status === 409) {
      //   toast.error("User already added.");
      // } else {
      //   toast.error("Error adding User! Please try again later.");
      // }
    }
  };

  const isSubmitDisabled =
    !formData.name ||
    !formData.email ||
    !Object.values(isClicked).some((clicked) => clicked) ||
    !Object.values(branchClicked).some((clicked) => clicked);

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

          <div className="select-btn">
            <div style={{ textAlign: "start", paddingLeft: "5px" }}>
              <label htmlFor="skills" style={{ fontSize: "15px" }}>
                Branch :
              </label>
            </div>
            <button
              type="button"
              className={branchClicked.cs ? "audio-button clicked" : "audio-button"}
              onClick={() => handleBranchButtonClick("cs")}
            >
              CS
            </button>
            <button
              type="button"
              className={branchClicked.extc ? "audio-button clicked" : "audio-button"}
              onClick={() => handleBranchButtonClick("extc")}
            >
              EXTC
            </button>
            <button
              type="button"
              className={branchClicked.aids ? "audio-button clicked" : "audio-button"}
              onClick={() => handleBranchButtonClick("aids")}
            >
              AI&DS
            </button>
            <button
              type="button"
              className={branchClicked.civil ? "audio-button clicked" : "audio-button"}
              onClick={() => handleBranchButtonClick("civil")}
            >
              CIVIL
            </button>
            <button
              type="button"
              className={branchClicked.mech ? "audio-button clicked" : "audio-button"}
              onClick={() => handleBranchButtonClick("mech")}
            >
              MECHANICAL
            </button>
          </div>

          <div className="select-btn">
            <div style={{ textAlign: "start", paddingLeft: "5px" }}>
              <label htmlFor="skills" style={{ fontSize: "15px" }}>
                Select :
              </label>
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
