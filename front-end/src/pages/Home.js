import { React, useEffect, useState } from "react";
import EmployeeInfo from "../components/EmployeeInfo";
import AddEmployeeForm from "../components/AddEmployeeForm";
import UpdateEmployeeForm from "../components/UpdateEmployeeForm";
import { FaEdit, FaArchive } from "react-icons/fa";

export const Home = () => {
  const [activeEmployees, setActiveEmployees] = useState(null);
  const [archivedEmployees, setArchivedEmployees] = useState(null);
  const [isEdit, setIsEdit] = useState(0);
  const [pagetab, setPagetab] = useState(true);

  useEffect(() => {
    fetchArchivedEmployees();
    fetchActiveEmployees();
  }, [pagetab]);

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

  const handleArchived = () => {};

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
                        // onClick={() => handleEdit(employee)}
                        className="emp-btn"
                      >
                        <FaEdit size={20} /> EDIT
                      </button>
                      <button
                        onClick={() => handleArchived(employee)}
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
                        // onClick={() => handleEdit(employee)}
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
      {/* <div className="form-container">
        {isEdit ? <UpdateEmployeeForm /> : <AddEmployeeForm />}
      </div> */}
    </div>
  );
};
