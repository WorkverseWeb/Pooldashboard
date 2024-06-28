import React, { useState } from "react";
import typography from "assets/theme/base/typography";

export default function Feedback3() {
  const [showForm, setShowForm] = useState(true);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const emojis = ["😄", "🙂", "😑", "😤", "😡"];

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
                      className={selectedEmoji === index ? "selected" : ""}
                      type="button"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              <div className="btn border-container" style={{ marginTop: "15px", left: "280px" }}>
                <button type="submit" className="border" disabled={!selectedEmoji}>
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
