
const { useState } = require("react")

const UpdateEmployeeFrom = (props) => {
    const {employee, empId,  fetchEmployees, NUMBER, SETnUMBER} = props
 
    const [employee_Name, setName] = useState(employee.employee_Name)
    const [employee_Dept, setDept] = useState(employee.employee_Dept)
    const [employee_Skills, setSkills] = useState(employee.employee_Skills)
    const [tempSkill, setTempSkill] = useState('')
    const [error, setError] = useState(null)

    const handleAddSkill = () => {
        if (tempSkill.trim() !== '') {
            setSkills([...employee_Skills, tempSkill.trim()])
            setTempSkill('')
        }
    }

    const handleUpdate = async (e) => {
        // e.prevent.Default()

        const updatedEmployee = { ...employee, employee_Name, employee_Dept, employee_Skills, isArchived: 'false' }
        console.log(employee)
        

        const response = await fetch(`/api/employees/${empId}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedEmployee),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setName('')
            setDept('')
            setSkills([])
            setError(null)
            fetchEmployees()
            console.log('Employee Updated', json)
        }
    }

    return (
        <div className="form">
            <h3>Update Employee</h3>

            <label>Employee Name</label>
            <input type="text" value={employee_Name} onChange={(e) => setName(e.target.value)} />

            <label>Assigned Department</label>
            <input type="text" value={employee_Dept} onChange={(e) => setDept(e.target.value)} />

            <label>Role</label>
            {
                employee_Skills.length!==0 ?
                    <ul className="skill-list">
                        {employee_Skills.map((skill, index) => (
                            <li className="skill-item" key={index}>{skill}</li>
                        ))}
                    </ul>
                    :
                    null
            }
            <input type="text" value={tempSkill} onChange={(e) => setTempSkill(e.target.value)} />
            <button type="button" onClick={handleAddSkill}>Add Skill</button>

            <h4>Temporary Skill Set</h4>


            <button onClick={handleUpdate}>Update</button>
            <button onClick={()=>{SETnUMBER(NUMBER+1)}}>ADD</button>
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default UpdateEmployeeFrom