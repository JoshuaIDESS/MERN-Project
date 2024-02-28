import { React, useEffect, useState } from "react";
import EmployeeInfo from "../components/EmployeeInfo";
import AddEmployeeForm from "../components/AddEmployeeForm";
import UpdateEmployeeForm from "../components/UpdateEmployeeForm";

export const Home = () => {
  const [employees, setEmployees] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [targetEmp, setTargetEmp] = useState(null)
  const [empId, setEmpId] = useState('')

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('/api/employees')
      const json = await response.json()

      if (response.ok) {
        setEmployees(json)
      }
    }

    fetchEmployees()
  }, []);

  const handleEdit = (employee) => {
    setIsEdit(!isEdit)
    setTargetEmp(employee)
    console.log(employee, isEdit)
    setEmpId(employee._id)
  }

  return (
    <div className="container">
      <div className="emp-container">
        {employees && employees.map((employee) => (
          <div className="emp-container-details" key={employee._id}>
            <h4>{employee.employee_Name}</h4>
            <p><strong>{employee.employee_Dept} Department</strong> </p>
            {employee.employee_Skills.map((skill, index) => (
              <p key={index}>{skill}</p>
            ))}
            <button onClick={() => handleEdit(employee)}>Edit</button>
          </div>
        ))}

      </div>
      <div className="form-container">
        {isEdit ?
          <UpdateEmployeeForm employee={targetEmp} empId={empId}/>
          :
          <AddEmployeeForm />
          }

      </div>

    </div>
  );
};
