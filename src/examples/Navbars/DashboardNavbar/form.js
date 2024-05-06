import React, { useState, useEffect } from "react";
import "./form.css";

function ProfileForm() {
  const [showForm, setShowForm] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    organization: "",
    designation: "",
    state: "",
    city: "",
    linkedIn: "",
    pool: "", // This will be either "Employee" or "Student"
  });

  useEffect(() => {
    // Check if the URL contains parameters indicating registration success
    const urlParams = new URLSearchParams(window.location.search);
    const successParam = urlParams.get("registration_success");
    console.log(successParam); // Debugging line

    if (successParam === "true") {
      // If registration was successful, show the form
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
      setFormSubmitted(true); // Set formSubmitted to true when form is submitted
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      organization: "",
      designation: "",
      state: "",
      city: "",
      linkedIn: "",
      pool: "",
    });
    console.log(formData); // For now, let's just log the form data
  };

  const validateForm = (formData) => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleCloseForm = () => {
    if (formSubmitted) {
      setShowForm(false);
      document.body.style.overflow = "";
    }
  };

  // Prevent scrolling when form is open
  if (showForm) {
    document.body.style.overflow = "hidden";
  }

  return (
    <div>
      {showForm && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-button" onClick={handleCloseForm}>
              &times;
            </span>
            <h5>Registration Form</h5>

            <form onSubmit={handleSubmit}>
              <div>
                <label>
                  First Name:
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <div>
                <label>
                  Last Name:
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <div>
                <label>
                  Email Address (Corporate only):
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <div>
                <label>
                  Number:
                  <input
                    type="tel"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <div>
                <label>
                  Organization / Institute / Company / College:
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <div>
                <label>
                  Designation / Role:
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <div>
                <label>
                  State:
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <div>
                <label>
                  City:
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <div>
                <label>
                  LinkedIn:
                  <input
                    type="text"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <div>
                <label>
                  Creating a pool for:
                  <select name="pool" value={formData.pool} onChange={handleInputChange} required>
                    <option value="">Select One</option>
                    <option value="Employee">Employee</option>
                    <option value="Student">Student</option>
                  </select>
                </label>
              </div>
            </form>
            <div className="btn">
              <button type="submit">Save Data</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileForm;
