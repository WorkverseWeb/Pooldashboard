import React, { useState, useEffect } from "react";
import "./customGroup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import typography from "assets/theme/base/typography";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const CustomGroups = () => {
  const [departments, setDepartments] = useState([""]);
  const [initialDepartments, setInitialDepartments] = useState([]);
  const { user, isAuthenticated } = useAuth0();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [slotDetails, setSlotDetails] = useState(null);
  const [slotsAvailable, setSlotsAvailable] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        if (user && user.email) {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/group/${user.email}`);
          if (response.status === 200 && response.data.groupname) {
            const dbDepartments = response.data.groupname.filter((dept) => dept.trim() !== "");
            setDepartments(dbDepartments);
            setInitialDepartments(dbDepartments);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDepartments();
  }, [user]);

  const handleAddDepartment = () => {
    if (departments.every((department) => department.trim() !== "")) {
      setDepartments([...departments, ""]);
    } else {
      toast.error("Please fill all fields before adding a new one.");
    }
  };

  const handleDepartmentChange = (index, value) => {
    const updatedDepartments = [...departments];
    updatedDepartments[index] = value;
    setDepartments(updatedDepartments);
  };

  const handleRemoveDepartment = (index) => {
    let newDepartments;
    if (departments.length === 1) {
      // If there's only one department, replace it with an empty string
      newDepartments = [""];
    } else {
      // Remove the department at the specified index
      newDepartments = [...departments.slice(0, index), ...departments.slice(index + 1)];
    }

    setDepartments(newDepartments);
    saveDepartments(newDepartments);
  };

  const saveDepartments = async () => {
    const nonEmptyDepartments = departments.filter((dept) => dept.trim() !== "");

    if (nonEmptyDepartments.length !== departments.length) {
      toast.error("Please fill all fields before submitting.");
      return;
    }

    const uniqueDepartments = new Set(nonEmptyDepartments.map((dept) => dept.trim().toLowerCase()));
    if (uniqueDepartments.size !== nonEmptyDepartments.length) {
      toast.error("Duplicate group names are not allowed.");
      return;
    }

    try {
      if (user && user.email) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/group/${user.email}`);
          if (response.status === 200) {
            await axios.patch(`${process.env.REACT_APP_BASE_URL}/group/${user.email}`, {
              groupname: nonEmptyDepartments,
            });
          }
        } catch (error) {
          await axios.post(`${process.env.REACT_APP_BASE_URL}/group`, {
            email: user.email,
            groupname: nonEmptyDepartments,
          });
        }
        setInitialDepartments(nonEmptyDepartments);
        toast.success("Groups Saved!");
      } else {
        toast.error("User email not available.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Error occurred while saving groups.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    saveDepartments(departments);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/assignUsers`, {
            params: {
              authenticatedUserEmail: user.email,
            },
          });

          if (response.data.success) {
            setData(response.data.users);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.error("Error fetching assigned users:", error);
          // toast.error("Error fetching assigned users. Please try again later.");
        }
      }
    };

    if (isAuthenticated && user) {
      fetchData();
    }
  }, [isAuthenticated, user]);

  const totalCount = data.length;
  // console.log(totalCount);

  useEffect(() => {
    const fetchSlotDetails = async (email, totalCount) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/slots/${email}`);
        if (response.status === 200) {
          const data = response.data;

          const quantities = Object.entries(data.AllProducts)
            .filter(([key, value]) => key !== "paymentStatus")
            .map(([key, value]) => value);
          const totalQty = quantities.reduce((acc, qty) => acc + qty, 0);

          setTotalQuantity(totalQty);

          const slotsAvailable = totalQty - totalCount;
          setSlotsAvailable(slotsAvailable);

          // const totalPlayers = totalCount;
          // setTotalPlayers(totalPlayers);
          setSlotDetails(data);
        }
      } catch (err) {
        console.error("Error fetching slot details:", err);
        setTotalQuantity(0);
        setSlotDetails(null);
      }
    };

    if (isAuthenticated && user) {
      fetchSlotDetails(user.email, totalCount);
    }
  }, [isAuthenticated, user, totalCount]);

  return (
    <div className="group-container border-container-box">
      <div className="border-box" style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {isAuthenticated ? (
          <div className="col1">
            <p>
              <span style={{ marginRight: "5px" }}>{totalQuantity} </span> Total Purchased Slots.
            </p>
            <p>
              <span style={{ marginRight: "5px" }}>{slotsAvailable}</span> Slots Available.
            </p>
            <p>
              <span style={{ marginRight: "5px" }}>0</span> Total Players.
            </p>
          </div>
        ) : (
          <div>no </div>
        )}
        <div className="col2">
          <form onSubmit={handleSubmit}>
            <div className="departments-wrapper">
              {departments.map((department, index) => (
                <div key={index} className="department-item">
                  <input
                    type="text"
                    placeholder="Add Group"
                    value={department}
                    onChange={(e) => handleDepartmentChange(index, e.target.value)}
                    style={{ width: department ? `${department.length + 2}ch` : "100px" }}
                  />
                  {department && (
                    <button className="btn1" onClick={() => handleRemoveDepartment(index)}>
                      -
                    </button>
                  )}
                  {index === departments.length - 1 && (
                    <button className="btn2" onClick={handleAddDepartment}>
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="border-container" style={{ marginTop: "10px" }}>
              <button
                type="submit"
                className="border"
                style={{ fontFamily: typography.fontFamily }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomGroups;
