import React, { useState } from "react";
import "./uploaduser.css";
import typography from "assets/theme/base/typography";
import PropTypes from "prop-types";
import * as xlsx from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon, IconButton } from "@mui/material";
import brandDark from "assets/images/information.png";
import brandWhite from "assets/images/instruction_img.PNG";

const UploadUser = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState([]);

  const handleFileChange = async (e) => {
    try {
      const File = e.target.files[0];
      const data = await File.arrayBuffer(File);
      const excelfile = xlsx.read(data);
      const excelsheet = excelfile.Sheets[excelfile.SheetNames[0]];
      const exceljson = xlsx.utils.sheet_to_json(excelsheet);

      // if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
      //   const excelfile = xlsx.read(data);
      //   const excelsheet = excelfile.Sheets[excelfile.SheetNames[0]];
      //   const exceljson = xlsx.utils.sheet_to_json(excelsheet);
      // } else if (file.name.endsWith(".csv")) {
      //   const csvData = Papa.parse(data, { header: true });
      //   exceljson = csvData.data;
      // } else {
      //   console.error("Unsupported file type");
      //   return;
      // }

      toast.success("File Uploaded !");

      setFile(File);
      setExcelData(exceljson);
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Error in uploading file!");
    }
  };

  // delete
  const handleFileRemove = () => {
    setFile(null);
    document.getElementById("fileSelect").value = "";
    setExcelData([]);
  };

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

    try {
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

      const fileInput = document.getElementById("fileSelect");
      if (fileInput) {
        fileInput.value = "";
      }
      setFile(null);
      setExcelData([]);
      toast.success("Uers Added Successfully !");
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Error in Adding Users!");
    }
  };

  const isSubmitDisabled = !file || !Object.values(isClicked).some((clicked) => clicked);

  // instruction
  const [open, setOpen] = useState(false);
  const handleClickToggle = () => {
    if (!file) {
      setOpen(!open);
    }
  };

  // select all
  const handleSelectAllClick = () => {
    const allSelected = Object.values(isClicked).every((value) => value);

    const newIsClicked = {};
    for (const skill in isClicked) {
      newIsClicked[skill] = !allSelected;
    }

    setIsClicked(newIsClicked);
  };

  return (
    <div className="upload-container">
      <div className="upload-form">
        <div className="upload-heading">
          <h4>Upload File</h4>
          <span className="material-icons" onClick={onClose}>
            &times;
          </span>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="select-btn">
            <div
              style={{
                fontSize: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <label htmlFor="skills">Select :</label>

              <button
                type="button"
                className="audio-button"
                onClick={handleSelectAllClick}
                style={{
                  margin: "0",
                  color: "#fff",
                }}
              >
                {Object.values(isClicked).every((value) => value) ? "Deselect All" : "Select All"}
              </button>
            </div>

            <button
              type="button"
              className={isClicked.csp ? "audio-button clicked" : "audio-button"}
              onClick={() => handleButtonClick("csp")}
            >
              Creative Problem solving
            </button>
            <button
              type="button"
              className={isClicked.em ? "audio-button clicked" : "audio-button"}
              onClick={() => handleButtonClick("em")}
            >
              Entrepreneurial Mindset
            </button>
            <button
              type="button"
              className={isClicked.nego ? "audio-button clicked" : "audio-button"}
              onClick={() => handleButtonClick("nego")}
            >
              Negotiation
            </button>
            <button
              type="button"
              className={isClicked.st ? "audio-button clicked" : "audio-button"}
              onClick={() => handleButtonClick("st")}
            >
              Story-telling
            </button>
            <button
              type="button"
              className={isClicked.fpt ? "audio-button clicked" : "audio-button"}
              onClick={() => handleButtonClick("fpt")}
            >
              First Principles Thinking
            </button>

            <button
              type="button"
              className={isClicked.src ? "audio-button clicked" : "audio-button"}
              onClick={() => handleButtonClick("src")}
            >
              Sharp Remote Communication
            </button>
            <button
              type="button"
              className={isClicked.collab ? "audio-button clicked" : "audio-button"}
              onClick={() => handleButtonClick("collab")}
            >
              Collaboration
            </button>
            <button
              type="button"
              className={isClicked.ei ? "audio-button clicked" : "audio-button"}
              onClick={() => handleButtonClick("ei")}
            >
              Emotional Intelligence
            </button>

            <button
              type="button"
              className={isClicked.pm ? "audio-button clicked" : "audio-button"}
              onClick={() => handleButtonClick("pm")}
            >
              Productivity Management
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ maxWidth: "300px" }}>
              <label htmlFor="fileSelect" style={{ fontSize: "15px", marginRight: "3px" }}>
                Upload :
              </label>
              <input
                id="fileSelect"
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleFileChange}
                style={{
                  padding: "5px",
                  backgroundColor: " rgba(255, 255, 255, 0.14)",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px 0 0 5px",
                  width: "70%",
                }}
              />

              {/* {file && ( */}
              <IconButton
                onClick={handleFileRemove}
                aria-label="delete"
                size="small"
                style={{
                  color: "red",
                  borderRadius: "0 5px 5px 0",
                  backgroundColor: " rgba(255, 255, 255, 0.14)",
                  height: "31px",
                  marginTop: "1px",
                }}
              >
                <Icon>delete</Icon>
              </IconButton>
              {/* )} */}
            </div>
            <div>
              <img
                src={brandDark}
                alt="instruction"
                onClick={handleClickToggle}
                className="instruction-icon "
              />
            </div>
          </div>
          <p style={{ margin: "0px", fontSize: "12px", padding: "0 60px" }}>
            Upload File in xlsx format only
          </p>
          {open && (
            <div className="instruction-box">
              <div className="instruction-heading">
                <h5 style={{ fontWeight: " 400", marginBottom: "5px" }}>Instructions</h5>
              </div>
              <p>
                Upload File in .xlsx format only. File format should be in same format as shown in
                below image or in attached below excel file.
              </p>
              <img src={brandWhite} alt="instruction-formatF" height={"80px"} />
              <a
                href="https://drive.google.com/drive/folders/1ZvhF_BtZ72fpZLEbLwiU_uAe21UPkNRr?usp=drive_link"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                download here
              </a>
              {/* google drive link or public file link  */}
            </div>
          )}

          {excelData.length > 1 && (
            <div className="table-container" id="table-style">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Group</th>
                  </tr>
                </thead>
                <tbody>
                  {excelData.map((getData, index) => (
                    <tr key={index}>
                      <td>{getData.Name}</td>
                      <td>{getData.Email}</td>
                      <td>{getData.Group}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="btn">
            <button
              type="submit"
              disabled={isSubmitDisabled}
              style={{
                cursor: isSubmitDisabled ? "not-allowed" : "pointer",
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
