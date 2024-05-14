import React, { useState } from "react";
import "./feedbackstyle.css";
import typography from "assets/theme/base/typography";

export default function Feedback3() {
  const [showForm, setShowForm] = useState(true);
  const { fontFamily } = typography;
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
        <div className="popup-container" style={{ fontFamily: fontFamily }}>
          <div className="popup-form">
            <div className="feedback-heading">
              <h4>Feedback Form</h4>
              <span className="material-icons" onClick={handleCloseForm}>
                &times;
              </span>
            </div>

            <div className="feedback-content">
              <p>
                Do you think that the group played the game is doing better in there career compared
                to other?
              </p>
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
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={!selectedEmoji}
                style={{ fontFamily: fontFamily }}
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
