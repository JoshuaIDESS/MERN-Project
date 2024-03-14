import { React, useEffect, useState } from "react";
import AddEmployeeForm from "../components/AddEmployeeForm";
import UpdateEmployeeForm from "../components/UpdateEmployeeForm";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { TbArchiveFilled } from "react-icons/tb";
import { BiSolidUserCheck } from "react-icons/bi";
import Swal from "sweetalert2";

export const Home = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(0);
  const [activeEmployees, setActiveEmployees] = useState(null);
  const [archivedEmployees, setArchivedEmployees] = useState(null);
  const [empInfo, setEmpInfo] = useState("");
  const [isEdit, setIsEdit] = useState("");
  const [pagetab, setPagetab] = useState(true);

  useEffect(() => {
    fetchArchivedEmployees();
    fetchActiveEmployees();
  }, [pagetab, isEdit]);

  async function fetchActiveEmployees() {
    setLoading(1);
    try {
      const response = await fetch("api/employees/getActiveEmployees/"); // Update the URL according to your API endpoint
      const data = await response.json();
      setActiveEmployees(data.payload); // Assuming payload contains the array of employees
      setLoading(0);
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

  const handleArchived = async (employee_id) => {
    setLoading(1)
    try {
      // Get the current date and time
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      const employeeData = {
        authorization: {},
        payload: {
          isArchived: true,
          updatedAt: formattedDate,
        },
      };
      const response = await fetch(
        `/api/employees/archivedEmployee/${employee_id}`,
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
      // setPagetab(1);
      if (response.ok) {
        fetchActiveEmployees();
        console.log("Employee archived successfully:", responseData);
        Toast.fire({
          title: "Employee archived successfully!",
          icon: "success",
        });
        setIsEdit("");
        setLoading(0)
      } else {
        console.error("Failed to archive employee:", responseData);
        // Handle failure
        setError("Failed to archive employee");
        setLoading(0)
      }
    } catch (error) {
      console.error("Error archiving employee:", error);
      setError("Error archiving employee");
      setLoading(0)
    } 
  };
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
  const handleActive = async (employee_id) => {
    setLoading(1)
    try {
      // Get the current date and time
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      const employeeData = {
        authorization: {},
        payload: {
          isArchived: false,
          updatedAt: formattedDate,
        },
      };
      const response = await fetch(
        `/api/employees/archivedEmployee/${employee_id}`,
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
      console.log(employeeData.payload.isArchived);
      // setPagetab(0);
      if (response.ok) {
        fetchArchivedEmployees();
        console.log(
          "Employee removed from archives successfully:",
          responseData
        );
        Toast.fire({
          title: "Employee is now Active!",
          icon: "success",
        });
        setIsEdit("");
        setLoading(0)
      } else {
        console.error(
          "Failed to removed employee from archives:",
          responseData
        );
        // Handle failure
        setError("Failed to removed employee from archives");
        setLoading(0)
      }
    } catch (error) {
      console.error("Error removing employee from archive:", error);
      setError("Error removing employee from archive");
      setLoading(0)
    }
  };

  const handleEdit = (employee_id) => {
    setIsEdit(employee_id);
  };
  const deleteEmployee = async (employee_id) => {
    try {
      const response = await fetch(
        `/api/employees/deleteEmployee/${employee_id}`,
        {
          method: "DELETE",
        }
      );

      fetchArchivedEmployees();
      setPagetab(0);
      if (response.ok) {
        console.log("Employee deleted successfully");
        // Handle success, e.g., navigate to another page or update state
        Toast.fire({
          title: "Employee deleted successfully!",
          icon: "success",
        });
        setLoading(0)
      } else {
        console.error("Failed to delete employee:", response.statusText);
        // Handle failure, e.g., display an error message
        setError("Failed to delete employee");
        setLoading(0)
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      // Handle error, e.g., display an error message
      setError("Error deleting employee");
      setLoading(0)
    }
  };
  const handleDelete = (employee_id) => {
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
        deleteEmployee(employee_id);
        setLoading(1)
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

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
          {error && <div className="error">{error}</div>}
          {loading ? (
            <div className="loader-holder">
              <div className="loader"></div>
            </div>
          ) : pagetab ? (
            activeEmployees &&
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
                      onClick={() => {
                        handleEdit(employee._id);
                        setEmpInfo(employee);
                      }}
                      className="emp-btn"
                    >
                      <RiEdit2Fill size={20} /> EDIT
                    </button>
                    <button
                      onClick={() => handleArchived(employee._id)}
                      className="emp-btn"
                    >
                      <TbArchiveFilled size={20} /> ARCHIVED
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            archivedEmployees &&
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
                      onClick={() => handleActive(employee._id)}
                      className="emp-btn"
                    >
                      <BiSolidUserCheck size={20} /> ACTIVE
                    </button>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="emp-btn"
                    >
                      <MdDeleteForever size={20} /> DELETE
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="form-container">
        {isEdit ? (
          <UpdateEmployeeForm
            employee_id={isEdit}
            setIsEdit={setIsEdit}
            employee={empInfo}
          />
        ) : (
          <AddEmployeeForm setPagetab={setPagetab} />
        )}
      </div>
    </div>
  );
};
