import { IoCloseSharp } from "react-icons/io5";
import Swal from "sweetalert2";
const { useState } = require("react");

const UpdateEmployeeFrom = (props) => {
  const { employee_id, setIsEdit, employee } = props;
  const [loading, setLoading] = useState(0);
  const [error, setError] = useState("");
  const [tempSkill, setTempSkill] = useState("");
  const [form, setForm] = useState({
    employee_Name: employee.employee_Name,
    employee_Dept: employee.employee_Dept,
    employee_Skills: employee.employee_Skills,
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

  const updateEmployee = async () => {
    try {
      if (
        !form.employee_Name ||
        !form.employee_Dept ||
        form.employee_Skills.length === 0
      ) {
        console.error("Incomplete data. Please fill in all fields.");
        setError("Incomplete data. Please fill in all fields.");
        // Handle incomplete data
        return;
      }
      // Get the current date and time
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      const employeeData = {
        authorization: {},
        payload: {
          ...form,
          updatedAt: formattedDate,
        },
      };
      const response = await fetch(
        `/api/employees/updateEmployee/${employee_id}`,
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
      if (response.ok) {
        console.log("Employee updated successfully:", responseData);
        Toast.fire({
          title: "Employee updated successfully!",
          icon: "success",
        });
      } else {
        console.error("Failed to update employee:", responseData);
        // Handle failure
        setError("Failed to update employee");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      setError("Error updating employee");
    }
    setIsEdit("");
    setLoading(0);
  };

  const handleUpdate = async () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      confirmButtonColor: "#1aac83",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        confirmButton: "order-1",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(1);
        updateEmployee();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="form">
      <h3>Update Employee</h3>
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
            onChange={(e) => {
              updateForm("employee_Name", e);
              setError("");
            }}
          />

          <label>Assigned Department</label>
          <input
            type="text"
            value={form.employee_Dept}
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
              onChange={(e) => {
                setTempSkill(e.target.value);
                setError("");
              }}
            />
            <button type="button" onClick={handleAddSkill}>
              Add Role
            </button>
          </div>
          <button onClick={handleUpdate}>Update</button>
          <div onClick={(e) => setIsEdit("")} className="cancel-btn">
            Cancel
          </div>
          {error && <div className="error">{error}</div>}
        </>
      )}
    </div>
  );
};

export default UpdateEmployeeFrom;
