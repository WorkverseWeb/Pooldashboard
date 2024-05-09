import React, { useState, useEffect } from "react";
import typography from "assets/theme/base/typography";
import "./doubtform.css";

export default function Doubtform() {
  const { fontFamily } = typography;

  return (
    <div style={{ fontFamily: fontFamily }} className="form-container">
      <form>
        <div>
          <input type="text" name="fullname" placeholder="Full Name" required />
        </div>
        <div>
          <input type="tel" name="number" placeholder="Number" required />
        </div>

        <div>
          <input type="textarea" name="doubt" required placeholder="Doubt" />
        </div>

        <div>
          <button type="submit" style={{ fontFamily: fontFamily }}>
            Save Data
          </button>
        </div>
      </form>
    </div>
  );
}
