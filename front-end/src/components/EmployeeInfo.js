

const EmployeeInfo = ({employee}) => {
    return (
        <div className="emp-container-details">
            <h4>{employee.employee_Name}</h4>
            <p><strong>{employee.employee_Dept} Department</strong> </p>
            {employee.employee_Skills.map ((skill, index) => (
                <p key={index}>{skill}</p>
            ))}
            
        </div>

    )
}

export default EmployeeInfo