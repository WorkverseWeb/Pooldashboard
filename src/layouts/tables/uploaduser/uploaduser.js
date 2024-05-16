import React, { useState } from "react";
import "./uploaduser.css";
import typography from "assets/theme/base/typography";
import PropTypes from "prop-types";
import * as xlsx from "xlsx";
// import Icon from "@mui/material/Icon";
// import IconButton from "@mui/material/IconButton";

const UploadUser = ({ onClose }) => {
  const { fontFamily } = typography;
  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState([]);

  const handleFileChange = async (e) => {
    const File = e.target.files[0];
    const data = await File.arrayBuffer(File);
    const excelfile = xlsx.read(data);
    const excelsheet = excelfile.Sheets[excelfile.SheetNames[0]];
    const exceljson = xlsx.utils.sheet_to_json(excelsheet);
    setFile(File);
    setExcelData(exceljson);
  };

  // const handleFileRemove = () => {
  // setFile(null);
  //   document.getElementById("fileSelect").value = "";
  // };

  const [isClicked, setIsClicked] = useState({
    csp: false,
    em: false,
    nego: false,
    st: false,
    fpt: false,
    src: false,
    collab: false,
    ei: false,
    pm: false,
  });

  const handleButtonClick = (value) => {
    setIsClicked((prevClicked) => ({
      ...prevClicked,
      [value]: !prevClicked[value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isSelected = Object.values(isClicked).some((clicked) => clicked);
    if (!isSelected) {
      return;
    }

    setIsClicked({
      csp: false,
      em: false,
      nego: false,
      st: false,
      fpt: false,
      src: false,
      collab: false,
      ei: false,
      pm: false,
    });

    setFile(null);
  };

  const isSubmitDisabled = !file || !Object.values(isClicked).some((clicked) => clicked);

  return (
    <div className="upload-container" style={{ fontFamily: fontFamily }}>
      <div className="upload-form">
        <div className="upload-heading">
          <h4>Upload File</h4>
          <span className="material-icons" onClick={onClose}>
            &times;
          </span>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="select-btn">
            <div style={{ textAlign: "start", paddingLeft: "10px", fontSize: "15px" }}>
              <label htmlFor="skills">Choose skills :</label>
            </div>

            <button
              type="button"
              className={isClicked.csp ? "button clicked" : "button"}
              onClick={() => handleButtonClick("csp")}
            >
              Creative Problem solving
            </button>
            <button
              type="button"
              className={isClicked.em ? "button clicked" : "button"}
              onClick={() => handleButtonClick("em")}
            >
              Entrepreneurial Mindset
            </button>
            <button
              type="button"
              className={isClicked.nego ? "button clicked" : "button"}
              onClick={() => handleButtonClick("nego")}
            >
              Negotiation
            </button>
            <button
              type="button"
              className={isClicked.st ? "button clicked" : "button"}
              onClick={() => handleButtonClick("st")}
            >
              Story-telling
            </button>
            <button
              type="button"
              className={isClicked.fpt ? "button clicked" : "button"}
              onClick={() => handleButtonClick("fpt")}
            >
              First Principles Thinking
            </button>

            <button
              type="button"
              className={isClicked.src ? "button clicked" : "button"}
              onClick={() => handleButtonClick("src")}
            >
              Sharp Remote Communication
            </button>
            <button
              type="button"
              className={isClicked.collab ? "button clicked" : "button"}
              onClick={() => handleButtonClick("collab")}
            >
              Collaboration
            </button>
            <button
              type="button"
              className={isClicked.ei ? "button clicked" : "button"}
              onClick={() => handleButtonClick("ei")}
            >
              Emotional Intelligence
            </button>

            <button
              type="button"
              className={isClicked.pm ? "button clicked" : "button"}
              onClick={() => handleButtonClick("pm")}
            >
              Productivity Management
            </button>
          </div>
          <label htmlFor="fileSelect" style={{ fontSize: "15px", marginRight: "3px" }}>
            Upload :
          </label>
          <input
            id="fileSelect"
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleFileChange}
          />
          {/* 
          {file && (
            <IconButton
              onClick={handleFileRemove}
              aria-label="delete"
              size="small"
              style={{ color: "red" }}
            >
              <Icon>delete</Icon>
            </IconButton>
          )} */}
          {excelData.length > 1 && (
            <table
              style={{
                textAlign: "center",
                width: "100%",
                padding: "10px 0",
                overflowY: "auto",
                maxHeight: "100px",
              }}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {excelData.map((getData, index) => (
                  <tr key={index}>
                    <td>{getData.Name}</td>
                    <td>{getData.Gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="btn">
            <button
              type="submit"
              disabled={isSubmitDisabled}
              style={{
                cursor: isSubmitDisabled ? "not-allowed" : "pointer",
                fontFamily: fontFamily,
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

UploadUser.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UploadUser;
