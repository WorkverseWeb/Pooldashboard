import React, { useState } from "react";
import "./uploaduser.css";
import typography from "assets/theme/base/typography";
import PropTypes from "prop-types";
import * as xlsx from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon, IconButton } from "@mui/material";
import brandDark from "assets/images/information.png";

const UploadUser = ({ onClose }) => {
  const { fontFamily } = typography;
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
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        toastStyle={{ minHeight: "50px", width: "270px", fontSize: "15px" }}
      />
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
              <div style={{ textAlign: "start", fontSize: "15px" }}>
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
                    marginTop: "2px",
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
                  onClick={handleClickOpen}
                  className="instruction-icon "
                />

                {open && (
                  <div className="instruction-box">
                    <div className="instruction-heading">
                      <h5 style={{ fontWeight: " 400" }}>Instructions</h5>
                      <span className="close-icon" onClick={handleClose}>
                        &times;
                      </span>
                    </div>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry standard dummy text ever since the.
                    </p>
                    <a href="%PUBLIC_URL%/example.xlsx" download>
                      download here
                    </a>
                    {/* google drive link or public file link  */}
                  </div>
                )}
              </div>
            </div>
            {excelData.length > 1 && (
              <div
                style={{
                  overflowY: "auto",
                  maxHeight: "150px",
                  margin: "20px 0",
                  padding: "0 10px",
                  backgroundColor: " rgba(255, 255, 255, 0.14)",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                <table>
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
                        <td>{getData.Email}</td>
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
                  fontFamily: fontFamily,
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

UploadUser.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UploadUser;
