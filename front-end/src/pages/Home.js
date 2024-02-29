import { React, useEffect, useState } from "react";
import EmployeeInfo from "../components/EmployeeInfo";
import AddEmployeeForm from "../components/AddEmployeeForm";
import UpdateEmployeeForm from "../components/UpdateEmployeeForm";
import { FaEdit, FaArchive } from "react-icons/fa";

export const Home = () => {
  const [employees, setEmployees] = useState(null);
  const [isEdit, setIsEdit] = useState(0);
  const [targetEmp, setTargetEmp] = useState(null);
  const [empId, setEmpId] = useState("");
  const [pagetab, setPagetab] = useState(true);
  const [error, setError] = useState(null);
  const [NUMBER, SETnUMBER] = useState(0);
  const [form_data, setFormData] = useState({
  
  });

  
  useEffect(() => {
    
    fetchEmployees();
  }, [pagetab]);

  const fetchEmployees = async () => {
    const response = await fetch(`/api/employees/get_archived/:is_archived?isArchived=${!pagetab}`);
    const json = await response.json();

    if (response.ok) {
      setEmployees(json);
    }
  };

  const handleEdit = (employee) => {
    setIsEdit(1);
    setTargetEmp(employee);
    console.log(employee, isEdit);
    setEmpId(employee._id);
    console.log(employee.isArchived);
  };

  const handleArchived = async (employee) => {
    const updatedEmployee = { isArchived: true };
    console.log(employee);

    const response = await fetch(`/api/employees/archive_data/${employee._id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedEmployee),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      console.log("Employee Archived", json);
      const fetchEmployees = async () => {
        const response = await fetch("/api/employees");
        const json = await response.json();
  
        if (response.ok) {
          setEmployees(json);
        }
      };
  
      fetchEmployees();
    }
  };

  const handlePagetabList = () => {
    setPagetab(true);
  };

  const handlePagetabArchived = () => {
    setPagetab(false);
  };

  return (
    <div className="container">
      <div className="emp-container">
        <div className="tab-container">
          <h3
            onClick={handlePagetabList}
            type="disabled"
            className={!pagetab ? "tab-inactive" : "tab-active"}
          >
            List
          </h3>
          <h3
            onClick={handlePagetabArchived}
            className={pagetab ? "tab-inactive" : "tab-active"}
          >
            Archived
          </h3>
        </div>
        <div className="emp-list-container">
          {employees &&
            employees.map((employee) =>
              {return (
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
               {
                pagetab?
                <div className="emp-btn-container">
                <button
                  onClick={() => handleEdit(employee)}
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
              </div>:
              null 
               }
              </div>
              )}
            )}
        </div>
      </div>
      <div className="form-container">
        {isEdit ? (
          <UpdateEmployeeForm employee={targetEmp} empId={empId} fetchEmployees={fetchEmployees} setIsEdit={setIsEdit}/>
        ) : (
          <AddEmployeeForm  fetchEmployees={fetchEmployees} />
        )}
      </div>
    </div>
  );
};
