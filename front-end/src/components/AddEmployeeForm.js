const { useState } = require("react");

const AddEmployeeForm = () => {
  const [error, setError] = useState("");
  const [tempSkill, setTempSkill] = useState("");
  const [form, setForm] = useState({
    employee_Name: "",
    employee_Dept: "",
    employee_Skills: [],
  });

  const handleAddSkill = () => {
    if (tempSkill.trim() !== "") {
      setForm(prevForm => ({
        ...prevForm,
        employee_Skills: [...prevForm.employee_Skills, tempSkill.trim()]
      }));
      setTempSkill("");
    }
  };
  
  function updateForm(key, e) {
    const value = e.target.value;
    setForm(prevForm => ({
      ...prevForm,
      [key]: value,
    }));
  }

  const handleRegister = async () => {
    try {
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
      const response = await fetch("/addEmployee", {
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
        })
        // Handle success
      } else {
        console.error("Failed to add employee:", responseData);
        // Handle failure
      }
    } catch (error) {
      setError(error)
      console.error("Error adding employee:", error);
      // Handle error
    }
  };

  return (
    <div className="form">
      <h3>Register Employee</h3>

      <label>Employee Name</label>
      <input
        type="text"
        value={form.employee_Name}
        onChange={(e) => {updateForm("employee_Name", e)}}
      />

      <label>Assigned Department</label>
      <input
        type="text"
        value={form.employee_Dept}
        onChange={(e) => {updateForm("employee_Dept", e)}}
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

      <button onClick={handleRegister}>Register</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default AddEmployeeForm;
