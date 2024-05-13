import React, { useState } from "react";
import "./feedback.css";
import typography from "assets/theme/base/typography";

export default function PopupForm() {
  const [showForm, setShowForm] = useState(true);
  const { fontFamily } = typography;
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiSelection = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      {showForm && (
        <div className="popup-container" style={{ fontFamily: fontFamily }}>
          <div className="popup-form">
            <div className="feedback-heading">
              <h4>Feedback Form</h4>
              <span className="material-icons" onClick={handleCloseForm}>
                &times;
              </span>
            </div>

            <div className="feedback-content">
              <p>How was your purchase process?</p>
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
            <div className="btn">
              <button type="submit" style={{ fontFamily: fontFamily }}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      ;
    </>
  );
}
