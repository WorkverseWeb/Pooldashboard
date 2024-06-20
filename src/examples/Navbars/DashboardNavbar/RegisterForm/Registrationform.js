import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import brandDark from "assets/images/student.svg";
import brandWhite from "assets/images/employee-man-alt.svg";
import "./Registrationform.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function RegistrationForm() {
  const { user, isAuthenticated } = useAuth0();
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  const [isClicked, setIsClicked] = useState({ Employee: false, Student: false });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    number: "",
    poolForCreator: "",
    organization: "",
    designation: "",
    state: "",
    city: "",
    linkdeInURL: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user && user.email) {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/users?email=${user.email}`
          );

          // console.log("regi form", response.data);
          const userData = response.data;

          if (userData && userData.organization) {
            setShowForm(false);
          } else {
            setShowForm(true);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setShowForm(true);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, user]);

  const handleButtonClick = (button) => {
    const newState = { Employee: false, Student: false, [button]: true };
    setIsClicked(newState);

    setFormData({
      ...formData,
      poolForCreator: button,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendStateToBackend = async (data) => {
    try {
      const { email } = data;
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/${email}`, data);
      // console.log("User data registered:", response);
      toast.success("User Registered !");
      return response;
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Error Registering User!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isValid = validateForm(formData);
      if (!isValid) {
        // console.log("Form data is not valid");
        return;
      }
      // console.log("Form data saved:", formData);

      const dataToSend = {
        ...formData,
        ...isClicked,
        status: ["NotVerified"],
      };

      sendStateToBackend(dataToSend);

      // Reset form data
      setFormData({
        fullName: "",
        email: "",
        number: "",
        poolForCreator: "",
        organization: "",
        designation: "",
        state: "",
        city: "",
        linkdeInURL: "",
      });

      setIsClicked({ Employee: false, Student: false });

      // notify
      // toast.success("User Registered !");
    } catch (error) {
      console.error("Error handling form submission:", error);
      // toast.error("Error Registering User!");
      return;
    }

    setShowForm(false);
    document.body.style.overflow = "";
  };

  const validateForm = (formData) => {
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(formData.number.trim())) {
      toast.error("Phone number should be 10 digits");
      return false;
    }
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  // const handleCloseForm = () => {
  //   setShowForm(false);
  //   document.body.style.overflow = "";

  //   sessionStorage.removeItem("isNewUser");
  // };

  const isSubmitDisabled =
    !formData.fullName ||
    !formData.email ||
    !formData.number ||
    !formData.organization ||
    !formData.designation ||
    !formData.state ||
    !formData.city ||
    !formData.linkdeInURL ||
    !formData.poolForCreator ||
    !Object.values(isClicked).some((clicked) => clicked);

  return (
    <div>
      {showForm && (
        <div className="popup">
          <div className="popup-content">
            <div className="registration-header">
              <h4>Registration Form</h4>
              {/* <span className="material-icons" onClick={handleCloseForm}>
                &times;
              </span> */}
            </div>

            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  placeholder="Number"
                  required
                />
              </div>

              <div
                style={{
                  display: "inline-flex",
                  gap: "15px",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <label style={{ fontWeight: "300" }}>Creating a pool for:</label>

                <button
                  className={isClicked.Employee ? "audio-button clicked" : "audio-button"}
                  onClick={() => handleButtonClick("Employee")}
                  type="button"
                  name="employee"
                  value="employee"
                  style={{ width: "100px" }}
                >
                  <img src={brandWhite} alt="employee img" style={{ width: "15px" }} />
                  Employee
                </button>

                <button
                  className={isClicked.Student ? "audio-button clicked" : "audio-button"}
                  onClick={() => handleButtonClick("Student")}
                  type="button"
                  name="student"
                  value="student"
                  style={{ width: "90px" }}
                >
                  <img src={brandDark} alt="student img" style={{ width: "15px" }} />
                  Student
                </button>
              </div>

              <div>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  required
                  placeholder="Organization / College"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  required
                  placeholder="Designation / Role"
                />
              </div>
              <div style={{ display: "flex", gap: "15px" }}>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  required
                />

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="linkdeInURL"
                  value={formData.linkdeInURL}
                  onChange={handleInputChange}
                  placeholder="linkdeIn URL"
                />
              </div>

              <div
                className="btn border-container"
                style={{ marginTop: "15px", marginBottom: "0", left: "265px" }}
              >
                <button
                  type="submit"
                  className="border"
                  disabled={isSubmitDisabled}
                  style={{
                    cursor: isSubmitDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;
