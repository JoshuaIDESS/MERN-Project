const { useState } = require("react");

const UpdateEmployeeFrom = (props) => {
  const { employee_id, setIsEdit, employee } = props;
  const [error, setError] = useState("");
  const [tempSkill, setTempSkill] = useState("");
  const [form, setForm] = useState({
    employee_Name: employee.employee_Name,
    employee_Dept: employee.employee_Dept,
    employee_Skills: employee.employee_Skills,
  });

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

  const handleUpdate = async () => {
    try {
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

      console.log(responseData)
      if (response.ok) {
        console.log("Employee updated successfully:", responseData);
        setIsEdit("")
      } else {
        console.error("Failed to update employee:", responseData);
        // Handle failure
        setError("Failed to update employee");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      setError("Error updating employee");
    }
  };

  return (
    <div className="form">
      <h3>Update Employee</h3>

      <label>Employee Name</label>
      <input
        type="text"
        value={form.employee_Name}
        onChange={(e) => {
          updateForm("employee_Name", e);
        }}
      />

      <label>Assigned Department</label>
      <input
        type="text"
        value={form.employee_Dept}
        onChange={(e) => {
          updateForm("employee_Dept", e);
        }}
      />

      <label>Role</label>
      {form.employee_Skills.length !== 0 ? (
        <ul className="skill-list">
          {form.employee_Skills.map((skill, index) => (
            <li className="skill-item" key={index}>
              {skill}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="skill-input-container">
        <input
          className="skill-input"
          type="text"
          value={tempSkill}
          onChange={(e) => setTempSkill(e.target.value)}
        />
        <button type="button" onClick={handleAddSkill}>
          Add Skill
        </button>
      </div>
      <button onClick={handleUpdate}>Update</button>
      <div onClick={(e) => setIsEdit("")} className="cancel-btn">
        Cancel
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default UpdateEmployeeFrom;
