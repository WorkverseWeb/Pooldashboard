import React, { useState } from "react";
import typography from "assets/theme/base/typography";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function Feedback3() {
  const { isAuthenticated, user } = useAuth0();
  const [showForm, setShowForm] = useState(true);
  const [selectedEmojiFeedback3, setSelectedEmojiFeedback3] = useState(null);
  const emojis = ["😄", "🙂", "😑", "😤", "😡"];

  const handleEmojiSelection = (emoji) => {
    setSelectedEmojiFeedback3(emoji);
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
        selectedEmojiFeedback3,
        formType: "form3",
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
                <p>
                  Do you think that the group played the game is doing better in there career
                  compared to other?
                </p>
                <div className="emoji-buttons">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmojiSelection(index)}
                      className={selectedEmojiFeedback3 === index ? "selected" : ""}
                      type="button"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              <div className="btn border-container" style={{ marginTop: "15px", left: "280px" }}>
                <button type="submit" className="border" disabled={selectedEmojiFeedback3 === null}>
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
