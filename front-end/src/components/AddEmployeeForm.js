import { IoCloseSharp } from "react-icons/io5";
import Swal from "sweetalert2";
const { useState } = require("react");

const AddEmployeeForm = (props) => {
  const { setPagetab } = props;
  const [loading, setLoading] = useState(0);
  const [error, setError] = useState("");
  const [tempSkill, setTempSkill] = useState("");
  const [form, setForm] = useState({
    employee_Name: "",
    employee_Dept: "",
    employee_Skills: [],
  });

  const handleRemoveSkill = (index) => {
    setForm((prevForm) => ({
      ...prevForm,
      employee_Skills: prevForm.employee_Skills.filter((_, i) => i !== index),
    }));
  };

  const handleAddSkill = () => {
    if (tempSkill.trim() !== "") {
      setForm((prevForm) => ({
        ...prevForm,
        employee_Skills: [...prevForm.employee_Skills, tempSkill.trim()],
      }));
      setTempSkill("");
    }
  };

  function updateForm(key, e) {
    const value = e.target.value;
    setForm((prevForm) => ({
      ...prevForm,
      [key]: value,
    }));
  }

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    // iconColor: 'white',
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const handleRegister = async () => {
    try {
      setLoading(1);
      if (
        !form.employee_Name ||
        !form.employee_Dept ||
        form.employee_Skills.length === 0
      ) {
        console.error("Incomplete data. Please fill in all fields.");
        setError("Incomplete data. Please fill in all fields.");
        // Handle incomplete data
        setLoading(0);
        return;
      }
      // Get the current date and time
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      const employeeData = {
        authorization: {},
        payload: {
          ...form,
          isArchived: false,
          createdAt: formattedDate,
        },
      };
      // Make a POST request to your API endpoint to add a new employee
      const response = await fetch("/api/employees/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      // Parse the JSON response
      const responseData = await response.json();
      // Check if the request was successful
      if (response.ok) {
        console.log("Employee added successfully:", responseData);
        setForm({
          employee_Name: "",
          employee_Dept: "",
          employee_Skills: [],
        });
        setTempSkill("");
        setError("");
        setLoading(0);
        Toast.fire({
          title: "Employee added successfully!",
          icon: "success",
        });
        // Handle success
      } else {
        console.error("Failed to add employee:", responseData);
        // Handle failure
      }
    } catch (error) {
      setError(error);
      console.error("Error adding employee:", error);
      // Handle error
    }
    setPagetab(1);
  };

  return (
    <div className="form">
      <h3>Register Employee</h3>
      {loading ? (
        <div className="loader-form">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <label>Employee Name</label>
          <input
            type="text"
            value={form.employee_Name}
            maxlength="50"
            onChange={(e) => {
              updateForm("employee_Name", e);
              setError("");
            }}
          />

          <label>Assigned Department</label>
          <input
            type="text"
            value={form.employee_Dept}
            maxlength="30"
            onChange={(e) => {
              updateForm("employee_Dept", e);
              setError("");
            }}
          />

          <label>Role</label>
          {form.employee_Skills.length !== 0 ? (
            <ul className="skill-list">
              {form.employee_Skills.map((skill, index) => (
                <li className="skill-item" key={index}>
                  {skill}
                  <IoCloseSharp
                    onClick={() => handleRemoveSkill(index)}
                    className="rmv-skill"
                  />
                </li>
              ))}
            </ul>
          ) : null}
          <div className="skill-input-container">
            <input
              className="skill-input"
              type="text"
              value={tempSkill}
              maxlength="30"
              onChange={(e) => {
                setTempSkill(e.target.value);
                setError("");
              }}
            />
            <button type="button" onClick={handleAddSkill}>
              Add Role
            </button>
          </div>

          <button onClick={handleRegister}>Register</button>
          {error && <div className="error">{error}</div>}
        </>
      )}
    </div>
  );
};

export default AddEmployeeForm;
