import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function Feedback2() {
  const { isAuthenticated, user } = useAuth0();
  const [showForm, setShowForm] = useState(true);
  const [selectedEmojiFeedback2, setSelectedEmojiFeedback2] = useState(null);
  const emojis = ["😄", "🙂", "😑", "😤", "😡"];

  const handleEmojiSelection = (emojiIndex) => {
    setSelectedEmojiFeedback2(emojiIndex);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/feedback`, {
        userEmail: user.email,
        selectedEmojiFeedback2,
        formType: "form2",
      });

      if (response.status === 200) {
        console.log("Feedback submitted successfully!");
        setShowForm(false);
      } else {
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <>
      {showForm && (
        <div className="popup-container">
          <div className="popup-form">
            <div className="feedback-heading">
              <h4>Feedback Form</h4>
              <span className="material-icons" onClick={handleCloseForm}>
                &times;
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="feedback-content">
                <p>How is the progress of your group?</p>
                <div className="emoji-buttons">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmojiSelection(index)}
                      className={selectedEmojiFeedback2 === index ? "selected" : ""}
                      type="button"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              <div className="btn border-container" style={{ marginTop: "15px", left: "280px" }}>
                <button type="submit" className="border" disabled={selectedEmojiFeedback2 === null}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
