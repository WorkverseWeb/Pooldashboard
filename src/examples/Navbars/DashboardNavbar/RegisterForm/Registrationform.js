import React, { useState, useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

import brandDark from "assets/images/student.svg";
import brandWhite from "assets/images/employee-man-alt.svg";
import "./Registrationform.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegistrationForm() {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();

  // const { isAuthenticated, user } = useAuth0();
  // const history = useHistory();
  const [isClicked, setIsClicked] = useState({ Employee: false, Student: false });

  const handleButtonClick = (value) => {
    if (formData.pool !== value) {
      setFormData((prevData) => ({ ...prevData, pool: value }));
      setIsClicked((prevClicked) => ({ ...prevClicked, [value]: true, [formData.pool]: false }));
    }
  };

  const [formData, setFormData] = useState({
    fullname: "",
    number: "",
    pool: "",
    organization: "",
    designation: "",
    state: "",
    city: "",
    linkedIn: "",
  });

  // useEffect(() => {
  //   if (isAuthenticated && user) {
  //     if (user["https://yourdomain.com/newUser"]) {
  //       history.push("/dashboard");
  //     }
  //   }
  // }, [isAuthenticated, user, history]);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm(formData);
    if (isValid) {
      console.log("Form data saved:", formData);

      // Reset
      setFormData((prevData) => ({
        ...prevData,
        fullname: "",
        pool: "",
        number: "",
        organization: "",
        designation: "",
        state: "",
        city: "",
        linkedIn: "",
      }));

      // Close form
      setShowForm(false);
      document.body.style.overflow = "";

      toast.success("User Registered !");
    } else {
      console.log("Form data is not valid");
    }
  };

  const validateForm = (formData) => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleCloseForm = () => {
    setShowForm(false);
    document.body.style.overflow = "";

    sessionStorage.removeItem("isNewUser");
  };

  const isSubmitDisabled =
    !formData.fullname ||
    !formData.number ||
    !formData.organization ||
    !formData.designation ||
    !formData.state ||
    !formData.city ||
    !formData.linkedIn ||
    !Object.values(isClicked).some((clicked) => clicked);

  return (
    <div>
      {showForm && (
        <div className="popup">
          <div className="popup-content">
            <div className="registration-header">
              <h4>Registration Form</h4>
              <span className="material-icons" onClick={handleCloseForm}>
                &times;
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  placeholder="Full Name"
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
                  style={{ width: "100px" }}
                >
                  <img src={brandWhite} alt="employee img" style={{ width: "15px" }} />
                  Employee
                </button>

                <button
                  className={isClicked.Student ? "audio-button clicked" : "audio-button"}
                  onClick={() => handleButtonClick("Student")}
                  type="button"
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
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  placeholder="LinkedIn"
                />
              </div>

              <div className="btn">
                <button
                  type="submit"
                  disabled={isSubmitDisabled}
                  style={{
                    cursor: isSubmitDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  Save Data
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
