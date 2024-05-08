import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./form.css";

function ProfileForm() {
  const [showForm, setShowForm] = useState(false);
  const { isAuthenticated, user } = useAuth0();
  const [isClicked, setIsClicked] = useState({ Employee: false, Student: false });

  const handleButtonClick = (value) => {
    if (formData.pool !== value) {
      setFormData({ pool: value });
      setIsClicked({ [value]: true, [formData.pool]: false });
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

  useEffect(() => {
    if (
      showForm ||
      (isAuthenticated && user && user["dev-hzug8opma4uobruz.us.auth0.com/dashboard/"])
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    if (isAuthenticated && user && user["dev-hzug8opma4uobruz.us.auth0.com/dashboard/"]) {
      setShowForm(true);
    }
  }, [showForm, isAuthenticated, user]);

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
      setFormData({
        fullname: "",
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

  return (
    <div>
      {showForm && (
        <div className="popup">
          <div className="popup-content">
            <div className="registration-header">
              <h3>Registration Form</h3>
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
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <label>Creating a pool for:</label>

                <button
                  className={isClicked.Employee ? "audio-button clicked" : "audio-button"}
                  onClick={() => handleButtonClick("Employee")}
                  type="button"
                >
                  Employee
                </button>

                <button
                  className={isClicked.Student ? "audio-button clicked" : "audio-button"}
                  onClick={() => handleButtonClick("Student")}
                  type="button"
                >
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
