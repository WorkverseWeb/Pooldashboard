import React, { useState, useEffect } from "react";
import "./uploaduser.css";
import PropTypes from "prop-types";
import * as xlsx from "xlsx";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Icon, IconButton } from "@mui/material";
import brandDark from "assets/images/information.png";
import brandWhite from "assets/images/instruction_img.PNG";
import { useAuth0 } from "@auth0/auth0-react";

const UploadUser = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const { user, isAuthenticated } = useAuth0();
  const [excelData, setExcelData] = useState([]);
  const [groups, setGroups] = useState([]);
  const [dbDepartments, setDbDepartments] = useState([]);
  const [departments, setDepartments] = useState([""]);
  const [slotDetails, setSlotDetails] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        if (user && user.email) {
          const response = await axios.get(`BASE_URL/group/${user.email}`);
          if (response.status === 200 && response.data.groupname) {
            const fetchedDepartments = response.data.groupname.filter((dept) => dept.trim() !== "");
            setDbDepartments(fetchedDepartments);
          } else {
            setDbDepartments([]);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDepartments();
  }, [user]);

  const handleFileChange = async (e) => {
    try {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const groups = await readExcelFile(selectedFile);
      setGroups(groups);
      toast.success("File Uploaded !");
    } catch (error) {
      console.error("An error occurred:", error);

      toast.error("Error in uploading file!");
    }
  };

  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const data = reader.result;
        const excelfile = xlsx.read(data, { type: "array" });
        const excelsheet = excelfile.Sheets[excelfile.SheetNames[0]];
        const exceljson = xlsx.utils.sheet_to_json(excelsheet);
        const groups = exceljson.map((entry) => entry.Group);
        // console.log("Groups:", groups);
        setExcelData(exceljson);
        resolve(groups);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const findUniqueWords = (array) => {
    let uniqueWords = [];

    array.forEach((word) => {
      if (!uniqueWords.includes(word)) {
        uniqueWords.push(word);
      }
    });

    return uniqueWords;
  };

  // merging groups from file and custom group
  useEffect(() => {
    const mergeAndFindUniqueWords = async () => {
      const mergedData = [...dbDepartments, ...groups];
      const uniqueWords = findUniqueWords(mergedData);
      setDepartments(uniqueWords);
      // console.log("Merged Unique Words:", uniqueWords);

      await updateDepartments(uniqueWords);
    };

    mergeAndFindUniqueWords();
  }, [dbDepartments, groups]);

  const updateDepartments = async (uniqueWords) => {
    try {
      const response = await axios.patch(`BASE_URL/group/${user.email}`, {
        groupname: uniqueWords,
      });
      if (response.status === 200) {
        console.log("Departments updated successfully");
      } else {
        console.error("Failed to update departments");
      }
    } catch (error) {
      console.error("Error updating departments:", error);
    }
  };

  // delete
  const handleFileRemove = () => {
    setFile(null);
    document.getElementById("fileSelect").value = "";
    setExcelData([]);
  };

  const [selectedSkills, setSelectedSkills] = useState([]);

  const [isClicked, setIsClicked] = useState({
    "Creative Problem solving": false,
    "Entrepreneurial Mindset": false,
    Negotiation: false,
    "Story-telling": false,
    "First Principles Thinking": false,
    "Sharp Remote Communication": false,
    Collaboration: false,
    "Emotional Intelligence": false,
    "Productivity Management": false,
    "Entire Game": false,
  });

  const handleButtonClick = (button) => {
    const newIsClicked = { ...isClicked, [button]: !isClicked[button] };
    setIsClicked(newIsClicked);

    let updatedSkills;
    if (newIsClicked[button]) {
      updatedSkills = [...selectedSkills, button];
    } else {
      updatedSkills = selectedSkills.filter((skill) => skill !== button);
    }

    setSelectedSkills(updatedSkills);
  };

  // send data to backend
  const sendDataToBackend = async (formData) => {
    try {
      const response = await axios.post("BASE_URL/assignUsers", formData);
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isSelected = Object.values(isClicked).some((clicked) => clicked);
      if (!isSelected) {
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("isClicked", JSON.stringify(isClicked));

      if (isAuthenticated && user) {
        formData.append("authenticatedUserEmail", user.email); // Add authenticated user's email
      } else {
        toast.error("User is not authenticated");
        return;
      }

      const response = await sendDataToBackend(formData, isClicked);
      // console.log("Backend Response:", response);

      const updatedSlotDetails = { ...slotDetails };
      Object.entries(isClicked).forEach(([skill, clicked]) => {
        if (clicked) {
          updatedSlotDetails[skill] = Math.max(0, updatedSlotDetails[skill] - 1);
        }
      });
      setSlotDetails(updatedSlotDetails);

      if (response.data.success) {
        setIsClicked({
          "Creative Problem solving": false,
          "Entrepreneurial Mindset": false,
          Negotiation: false,
          "Story-telling": false,
          "First Principles Thinking": false,
          "Sharp Remote Communication": false,
          Collaboration: false,
          "Emotional Intelligence": false,
          "Productivity Management": false,
          "Entire Game": false,
        });

        const fileInput = document.getElementById("fileSelect");
        if (fileInput) {
          fileInput.value = "";
        }
        setFile(null);
        setExcelData([]);

        toast.success("Data uploaded successfully!");
      } else if (response.data.duplicates && response.data.duplicates.length > 0) {
        toast.error("Duplicate users found. Please check and try again.");
      } else if (
        response.data.message &&
        response.data.message.includes(
          "Please add all unique group names to the Group collection first"
        )
      ) {
        toast.error(
          "Error: Some unique group names found. Please add them to the Group collection first."
        );
      } else {
        toast.error(response.data.message || "Error uploading data. Please try again later.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      if (error.response && error.response.status === 409) {
        if (error.response.data.duplicates && error.response.data.duplicates.length > 0) {
          toast.error("Duplicate users found. Please check and try again.");
        } else if (
          error.response.data.message &&
          error.response.data.message.includes(
            "Please add all unique group names to the Group collection first"
          )
        ) {
          toast.error(
            "Error: Some unique group names found. Please add them to the Group collection first."
          );
        } else {
          toast.error("Error uploading data. Please try again later.");
        }
      } else {
        toast.error("Error uploading data. Please try again later.");
      }
    }
  };

  const isSubmitDisabled = !file || !Object.values(isClicked).some((clicked) => clicked);

  useEffect(() => {
    const fetchSlotDetails = async (email) => {
      try {
        const response = await axios.get(`BASE_URL/initialslot/${email}`);
        console.log("Slot details fetched:", response.data.AllProducts);
        if (response.status === 200) {
          const data = response.data.AllProducts;

          const skillOrder = [
            "Creative Problem solving",
            "Entrepreneurial Mindset",
            "Negotiation",
            "Story-telling",
            "First Principles Thinking",
            "Sharp Remote Communication",
            "Collaboration",
            "Emotional Intelligence",
            "Productivity Management",
            "Entire Game",
          ];

          const mappedSlotDetails = {};
          skillOrder.forEach((skill, index) => {
            const levelKey = `level${index + 1}`;
            const individualSkillQuantity = data[levelKey] || 0;
            mappedSlotDetails[skill] = individualSkillQuantity;
          });

          mappedSlotDetails["Entire Game"] = data["allLevels"] || 0;

          console.log("mappedSlot", mappedSlotDetails);
          setSlotDetails(mappedSlotDetails);
        }
      } catch (err) {
        console.error("Error fetching slot details:", err);
        setSlotDetails(null);
      }
    };

    if (isAuthenticated && user) {
      fetchSlotDetails(user.email);
    }
  }, [isAuthenticated, user]);

  // instruction
  const [open, setOpen] = useState(false);
  const handleClickToggle = () => {
    if (!file) {
      setOpen(!open);
    }
  };

  // select all
  const handleSelectAllClick = () => {
    const allSelected = Object.keys(isClicked).every(
      (skill) => isClicked[skill] || (slotDetails && slotDetails[skill] === 0)
    );

    const newIsClicked = {};
    for (const skill in isClicked) {
      if (slotDetails && slotDetails[skill] > 0) {
        newIsClicked[skill] = !allSelected;
      } else {
        newIsClicked[skill] = false;
      }
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

            {Object.keys(isClicked).map((skill) => {
              const quantity =
                slotDetails && slotDetails[skill] !== undefined ? slotDetails[skill] : 0;
              return (
                <button
                  key={skill}
                  type="button"
                  className={
                    quantity > 0
                      ? isClicked[skill]
                        ? "audio-button clicked"
                        : "audio-button"
                      : "audio-button disabled"
                  }
                  disabled={quantity === 0}
                  onClick={() => handleButtonClick(skill)}
                >
                  {skill}
                  <span className="badge">{quantity}</span>
                </button>
              );
            })}
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
                  color: "#9ce325",
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

          <div className="btn border-container" style={{ left: "600px" }}>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="border"
              style={{
                cursor: isSubmitDisabled ? "not-allowed" : "pointer",
                padding: "8px 20px",
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
