import React, { useState, useEffect } from "react";
import "./adduser.css";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import typography from "assets/theme/base/typography";

const AddUser = ({ onClose }) => {
  const [departments, setDepartments] = useState([""]);
  const { user, isAuthenticated } = useAuth0();
  const [slotDetails, setSlotDetails] = useState(null);
  const [branchClicked, setBranchClicked] = useState({});

  const [formData, setFormData] = useState({
    auName: "",
    auEmail: "",
    auGroup: "",
    auSkills: [],
  });

  const [isClicked, setIsClicked] = useState({
    "Creative Problem solving": false,
    "Entrepreneurial Mindset": false,
    Negotiation: false,
    "Story-telling": false,
    "First Principles Thinking": false,
    "Sharp Remote Communication": false,
    Collaboration: false,
    "Emotional Intelligence": false,
    "Productivity Management": false,
    "Entire Game": false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // skills clicked
  const handleButtonClick = (button) => {
    const newIsClicked = { ...isClicked, [button]: !isClicked[button] };
    setIsClicked(newIsClicked);

    let updatedSkills;
    if (newIsClicked[button]) {
      updatedSkills = [...formData.auSkills, button]; // Add the skill if clicked
    } else {
      updatedSkills = formData.auSkills.filter((skill) => skill !== button); // Remove the skill if unclicked
    }

    setFormData({
      ...formData,
      auSkills: updatedSkills,
    });
  };

  // group clicked
  const handleBranchButtonClick = (button) => {
    const newBranch = Object.keys(branchClicked).reduce((acc, dept) => {
      acc[dept] = dept === button;
      return acc;
    }, {});
    setBranchClicked(newBranch);
    // console.log("Branch clicked:", newBranch);

    setFormData({
      ...formData,
      auGroup: button,
    });
  };

  // send form data to backend
  const sendStateToBackend = async (data) => {
    try {
      const response = await axios.post("BASE_URL/assignUsers", data);
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
      throw error;
    }
  };

  // forn submit
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

      const updatedSlotDetails = { ...slotDetails };
      Object.entries(isClicked).forEach(([skill, clicked]) => {
        if (clicked) {
          updatedSlotDetails[skill] = Math.max(0, updatedSlotDetails[skill] - 1);
        }
      });
      setSlotDetails(updatedSlotDetails);

      const formDataObject = new FormData();

      formDataObject.append("auName", formData.auName);
      formDataObject.append("auEmail", formData.auEmail);
      formDataObject.append("auGroup", formData.auGroup);
      formDataObject.append("auSkills", formData.auSkills);
      formDataObject.append("isClicked", JSON.stringify(isClicked));
      formDataObject.append("branchClicked", JSON.stringify(branchClicked));

      if (isAuthenticated && user) {
        formDataObject.append("authenticatedUserEmail", user.email.toLowerCase());
      } else {
        toast.error("User is not authenticated");
        return;
      }

      const response = await sendStateToBackend(formDataObject);

      // const response = await sendStateToBackend({ ...formData, ...isClicked, ...branchClicked });

      if (response.data.success) {
        // RESET
        setFormData({
          auName: "",
          auEmail: "",
          auGroup: "",
          auSkills: [],
        });

        setIsClicked({
          "Creative Problem solving": false,
          "Entrepreneurial Mindset": false,
          Negotiation: false,
          "Story-telling": false,
          "First Principles Thinking": false,
          "Sharp Remote Communication": false,
          Collaboration: false,
          "Emotional Intelligence": false,
          "Productivity Management": false,
          "Entire Game": false,
        });

        const resetBranchClicked = Object.keys(branchClicked).reduce((acc, dept) => {
          acc[dept] = false;
          return acc;
        }, {});
        setBranchClicked(resetBranchClicked);

        toast.success("User Added Successfully!");
      } else {
        toast.error("Error adding user! Please try again later.");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("User already added.");
      } else {
        toast.error("Error adding User! Please try again later.");
      }
    }
  };

  // submit button disable utnil all values are filled
  const isSubmitDisabled =
    !formData.auName ||
    !formData.auEmail ||
    !formData.auGroup ||
    !formData.auSkills ||
    !Object.values(isClicked).some((clicked) => clicked) ||
    !Object.values(branchClicked).some((clicked) => clicked);

  // select all skills
  const handleSelectAllClick = () => {
    const allSelected = Object.keys(isClicked).every(
      (skill) => isClicked[skill] || (slotDetails && slotDetails[skill] === 0)
    );

    const newIsClicked = {};
    const selectedSkills = [];

    for (const skill in isClicked) {
      if (slotDetails && slotDetails[skill] > 0) {
        newIsClicked[skill] = !allSelected;
        if (!allSelected) {
          selectedSkills.push(skill);
        }
      } else {
        newIsClicked[skill] = false;
      }
    }

    setIsClicked(newIsClicked);

    setFormData({
      ...formData,
      auSkills: allSelected ? [] : selectedSkills,
    });
  };

  useEffect(() => {
    const fetchSlotDetails = async (email) => {
      try {
        const response = await axios.get(`BASE_URL/initialslot/${email}`);
        console.log("Slot details fetched:", response.data.AllProducts);
        if (response.status === 200) {
          const data = response.data.AllProducts;

          const skillOrder = [
            "Creative Problem solving",
            "Entrepreneurial Mindset",
            "Negotiation",
            "Story-telling",
            "First Principles Thinking",
            "Sharp Remote Communication",
            "Collaboration",
            "Emotional Intelligence",
            "Productivity Management",
            "Entire Game",
          ];

          const mappedSlotDetails = {};
          skillOrder.forEach((skill, index) => {
            const levelKey = `level${index + 1}`;
            const individualSkillQuantity = data[levelKey] || 0;
            mappedSlotDetails[skill] = individualSkillQuantity;
          });

          mappedSlotDetails["Entire Game"] = data["allLevels"] || 0;

          console.log("mappedSlot", mappedSlotDetails);
          setSlotDetails(mappedSlotDetails);
        }
      } catch (err) {
        console.error("Error fetching slot details:", err);
        setSlotDetails(null);
      }
    };

    if (isAuthenticated && user) {
      fetchSlotDetails(user.email);
    }
  }, [isAuthenticated, user]);

  // fetch group
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        if (user && user.email) {
          const response = await axios.get(`BASE_URL/group/${user.email}`);
          if (response.status === 200 && response.data.groupname) {
            const dbDepartments = response.data.groupname.filter((dept) => dept.trim() !== "");
            setDepartments(dbDepartments);
            const initialBranchClicked = dbDepartments.reduce((acc, dept) => {
              acc[dept] = false;
              return acc;
            }, {});
            setBranchClicked(initialBranchClicked);
          } else {
            setDepartments([]);
            setBranchClicked({});
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDepartments();
  }, [user]);

  return (
    <div className="add-container">
      <div className="add-form ">
        <div className="purchase-heading">
          <h4>Add User</h4>
          <span className="material-icons" onClick={onClose}>
            &times;
          </span>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="auName"
            placeholder="Name"
            value={formData.auName}
            onChange={handleInputChange}
            required
            style={{ marginBottom: "15px" }}
          />

          <input
            type="email"
            name="auEmail"
            placeholder="Email"
            value={formData.auEmail}
            onChange={handleInputChange}
            required
            style={{ marginBottom: "10px" }}
          />

          {/* GROUP */}
          <div className="select-group">
            <div style={{ textAlign: "start", paddingLeft: "5px" }}>
              <label htmlFor="skills" style={{ fontSize: "15px" }}>
                Group :
              </label>
            </div>
            {departments && departments.filter(Boolean).length > 0 ? (
              departments.filter(Boolean).map((department, index) => (
                <button
                  type="button"
                  className={branchClicked[department] ? "branch-button clicked" : "branch-button"}
                  onClick={() => handleBranchButtonClick(department)}
                  key={index}
                  value={department}
                >
                  {department}
                </button>
              ))
            ) : (
              <p style={{ fontSize: "14px", margin: "10px" }}>Add groups first</p>
            )}
          </div>

          {/* SKILLS */}
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

            {Object.keys(isClicked).map((skill) => {
              const quantity =
                slotDetails && slotDetails[skill] !== undefined ? slotDetails[skill] : 0;
              return (
                <button
                  key={skill}
                  type="button"
                  className={
                    quantity > 0
                      ? isClicked[skill]
                        ? "audio-button clicked"
                        : "audio-button"
                      : "audio-button disabled"
                  }
                  disabled={quantity === 0}
                  onClick={() => handleButtonClick(skill)}
                >
                  {skill}
                  <span className="badge">{quantity}</span>
                </button>
              );
            })}
          </div>

          <div className="btn border-container" style={{ left: "490px ", marginTop: "10px" }}>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="border"
              style={{
                cursor: isSubmitDisabled ? "not-allowed" : "pointer",
                padding: "8px 20px",
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
