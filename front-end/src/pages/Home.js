import { React, useEffect, useState } from "react";
import AddEmployeeForm from "../components/AddEmployeeForm";
import UpdateEmployeeForm from "../components/UpdateEmployeeForm";
import { FaEdit, FaArchive } from "react-icons/fa";

export const Home = () => {
  const [error, setError] = useState("");
  const [activeEmployees, setActiveEmployees] = useState(null);
  const [archivedEmployees, setArchivedEmployees] = useState(null);
  const [empInfo, setEmpInfo] = useState("");
  const [isEdit, setIsEdit] = useState("");
  const [pagetab, setPagetab] = useState(true);

  useEffect(() => {
    fetchArchivedEmployees();
    fetchActiveEmployees();
  }, [pagetab, isEdit]);

  async function fetchActiveEmployees() {
    try {
      const response = await fetch("api/employees/getActiveEmployees/"); // Update the URL according to your API endpoint
      const data = await response.json();
      setActiveEmployees(data.payload); // Assuming payload contains the array of employees
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchArchivedEmployees() {
    try {
      const response = await fetch("api/employees/getArchivedemployees/"); // Update the URL according to your API endpoint
      const data = await response.json();
      setArchivedEmployees(data.payload); // Assuming payload contains the array of employees
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleArchived = async (employee_id) => {
    try {
      // Get the current date and time
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      const employeeData = {
        authorization: {},
        payload: {
          isArchived: true,
          updatedAt: formattedDate,
        },
      };
      const response = await fetch(
        `/api/employees/archivedEmployee/${employee_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        }
      );

      const responseData = await response.json();

      console.log(responseData);
      setPagetab(1)
      if (response.ok) {
        console.log("Employee archived successfully:", responseData);
        setIsEdit("");
      } else {
        console.error("Failed to archive employee:", responseData);
        // Handle failure
        setError("Failed to archive employee");
      }
    } catch (error) {
      console.error("Error archiving employee:", error);
      setError("Error archiving employee");
    }
  };

  const handleActive = async (employee_id) => {
    try {
      // Get the current date and time
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      const employeeData = {
        authorization: {},
        payload: {
          isArchived: false,
          updatedAt: formattedDate,
        },
      };
      const response = await fetch(
        `/api/employees/archivedEmployee/${employee_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        }
      );

      const responseData = await response.json();

      console.log(responseData);
      console.log(employeeData.payload.isArchived);
      setPagetab(0)
      if (employeeData.payload.isArchived = false) {
        console.log("Employee archived successfully:", responseData);
      } else {
        console.log("Employee removed from archived successfully:", responseData);
      }
    } catch (error) {
      console.error("Error archiving employee:", error);
      setError("Error archiving employee");
    }
  };

  const handleEdit = (employee_id) => {
    setIsEdit(employee_id);
  };

  return (
    <div className="container">
      <div className="emp-container">
        <div className="tab-container">
          <h3
            onClick={() => setPagetab(true)}
            type="disabled"
            className={!pagetab ? "tab-inactive" : "tab-active"}
          >
            List
          </h3>
          <h3
            onClick={() => setPagetab(false)}
            className={pagetab ? "tab-inactive" : "tab-active"}
          >
            Archived
          </h3>
        </div>
        <div className="emp-list-container">
          {error && <div className="error">{error}</div>}
          {pagetab
            ? activeEmployees &&
              activeEmployees.map((employee) => {
                return (
                  <div className="emp-container-details" key={employee._id}>
                    <h4>{employee.employee_Name}</h4>
                    <p className="emp-dept">
                      <strong>{employee.employee_Dept} Department</strong>
                    </p>
                    <div className="skill-container">
                      {employee.employee_Skills.map((skill, index) => (
                        <p key={index} className="skill-per-item">
                          {skill}
                        </p>
                      ))}
                    </div>
                    <div className="emp-btn-container">
                      <button
                        onClick={() => {
                          handleEdit(employee._id);
                          setEmpInfo(employee);
                        }}
                        className="emp-btn"
                      >
                        <FaEdit size={20} /> EDIT
                      </button>
                      <button
                        onClick={() => handleArchived(employee._id)}
                        className="emp-btn"
                      >
                        <FaArchive size={20} /> ARCHIVED
                      </button>
                    </div>
                  </div>
                );
              })
            : archivedEmployees &&
              archivedEmployees.map((employee) => {
                return (
                  <div className="emp-container-details" key={employee._id}>
                    <h4>{employee.employee_Name}</h4>
                    <p className="emp-dept">
                      <strong>{employee.employee_Dept} Department</strong>
                    </p>
                    <div className="skill-container">
                      {employee.employee_Skills.map((skill, index) => (
                        <p key={index} className="skill-per-item">
                          {skill}
                        </p>
                      ))}
                    </div>
                    <div className="emp-btn-container">
                      <button
                        onClick={() => handleActive(employee._id)}
                        className="emp-btn"
                      >
                        <FaEdit size={20} /> ACTIVE
                      </button>
                      <button
                        onClick={() => handleArchived(employee)}
                        className="emp-btn"
                      >
                        <FaArchive size={20} /> DELETE
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <div className="form-container">
        {isEdit ? (
          <UpdateEmployeeForm
            employee_id={isEdit}
            setIsEdit={setIsEdit}
            employee={empInfo}
          />
        ) : (
          <AddEmployeeForm />
        )}
      </div>
    </div>
  );
};
