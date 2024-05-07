import React, { useState, useEffect } from "react";
import "./form.css";
import brandWhite from "assets/images/graduated.png";
import brandDark from "assets/images/employee-img.png";

function ProfileForm() {
  const [showForm, setShowForm] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [isClicked, setIsClicked] = useState({ Employee: false, Student: false });

  const handleButtonClick = (value) => {
    if (formData.pool !== value) {
      setFormData({ pool: value });
      setIsClicked({ [value]: true });
      setIsClicked((prevIsClicked) => ({
        ...prevIsClicked,
        [formData.pool]: false,
      }));
    }
  };

  const [formData, setFormData] = useState({
    FullName: "",
    number: "",
    pool: "",
    organization: "",
    designation: "",
    state: "",
    city: "",
    linkedIn: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const successParam = urlParams.get("registration_success");
    console.log(successParam);

    if (successParam === "true") {
      setTimeout(() => {
        setShowForm(true);
      }, 500);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission here
    const isValid = validateForm(formData);
    if (isValid) {
      console.log("Form data saved:", formData);

      // Reset
      setFormData({
        FullName: "",
        pool: "",
        number: "",
        organization: "",
        designation: "",
        state: "",
        city: "",
        linkedIn: "",
      });

      // Close form
      setShowForm(false);
      document.body.style.overflow = "";
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
  };

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showForm]);

  return (
    <div>
      {showForm && (
        <div className="popup">
          <div className="popup-content">
            <div className="registration-header">
              <h3>Registration Form</h3>
              <p className="material-icons close-button" onClick={handleCloseForm}>
                &times;
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="Full tName"
                  value={formData.FullName}
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

              <div>
                <label>Creating a pool for:</label>

                <div style={{ display: "flex", gap: "20px" }}>
                  <button
                    className={isClicked.Employee ? "audio-button clicked" : "audio-button"}
                    onClick={() => handleButtonClick("Employee")}
                    type="button"
                  >
                    <img src={brandDark} alt="Employee Icon" style={{ width: "20px" }} />
                    Employee
                  </button>

                  <button
                    className={isClicked.Student ? "audio-button clicked" : "audio-button"}
                    onClick={() => handleButtonClick("Student")}
                    type="button"
                  >
                    <img src={brandWhite} alt="Employee Icon" style={{ width: "15px" }} />
                    Student
                  </button>
                </div>
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
              <div style={{ display: "flex", gap: "5px" }}>
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
                <button type="submit">Save Data</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileForm;
