import React, { useState } from "react";
import "./feedbackstyle.css";
import typography from "assets/theme/base/typography";

export default function Feedback2() {
  const [showForm, setShowForm] = useState(true);

  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiSelection = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmit = () => {
    setShowForm(false);
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

            <div className="feedback-content">
              <p>How is the progress of your group?</p>
              <div className="emoji-buttons">
                {/* Displaying clickable emoji buttons */}
                <button
                  onClick={() => handleEmojiSelection("😄")}
                  className={selectedEmoji === "😄" ? "selected" : ""}
                >
                  😄
                </button>
                <button
                  onClick={() => handleEmojiSelection("🙂")}
                  className={selectedEmoji === "🙂" ? "selected" : ""}
                >
                  🙂
                </button>
                <button
                  onClick={() => handleEmojiSelection("😑")}
                  className={selectedEmoji === "😑" ? "selected" : ""}
                >
                  😑
                </button>
                <button
                  onClick={() => handleEmojiSelection("😤")}
                  className={selectedEmoji === "😤" ? "selected" : ""}
                >
                  😤
                </button>
                <button
                  onClick={() => handleEmojiSelection("😡")}
                  className={selectedEmoji === "😡" ? "selected" : ""}
                >
                  😡
                </button>
              </div>
            </div>
            <div className="btn border-container" style={{ marginTop: "15px", left: "280px" }}>
              <button
                type="submit"
                className="border"
                onClick={handleSubmit}
                disabled={!selectedEmoji}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
