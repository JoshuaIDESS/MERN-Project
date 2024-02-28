const { useState } = require("react")

const AddEmployeeForm = () => {
    const [employee_Name, setName] = useState('')
    const [employee_Dept, setDept] = useState('')
    const [employee_Skills, setSkills] = useState([])
    const [tempSkill, setTempSkill] = useState('')
    const [error, setError] = useState(null)

    const handleAddSkill = () => {
        if (tempSkill.trim() !== '') {
            setSkills([...employee_Skills, tempSkill.trim()])
            setTempSkill('')
        }
    }

    const handleRegister = async (e) => {
        // e.prevent.Default()

        const employee = { employee_Name, employee_Dept, employee_Skills, isArchived: 'false' }
        console.log(employee)

        const response = await fetch('/api/employees', {
            method: 'POST',
            body: JSON.stringify(employee),
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
            console.log('New employee added', json)
        }
    }

    return (
        <div className="form">
            <h3>Register Employee</h3>

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
                    </ul> :
                    null
            }
            <input type="text" value={tempSkill} onChange={(e) => setTempSkill(e.target.value)} />
            <button type="button" onClick={handleAddSkill}>Add Skill</button>

            <h4>Temporary Skill Set</h4>


            <button onClick={handleRegister}>Register</button>
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default AddEmployeeForm
