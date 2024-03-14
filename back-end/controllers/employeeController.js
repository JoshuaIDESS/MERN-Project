// const Employee = require("../models/employeeModel");
// const mongoose = require("mongoose");

const { MongoClient, ObjectId } = require("mongodb");

// MongoDB Connection URL
const url = process.env.MONGO_URI;

//Get all employees
const getAllArchivedemployees = async (req, res) => {
  var response = {
    remarks: "error",
    message: "",
    payload: [],
  };

  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db();
    const collection = db.collection("employees");
    const results = await collection
      .find({ isArchived: true })
      .sort({ createdAt: -1 })
      .toArray();
    response.remarks = "Success";
    response.message = "Successfully fetch";
    response.payload = results;
    res.json(response);
    client.close();
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Get all employees
const getAllActiveEmployees = async (req, res) => {
  var response = {
    remarks: "error",
    message: "",
    payload: [],
  };

  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db();
    const collection = db.collection("employees");
    const results = await collection
      .find({ isArchived: false })
      .sort({ createdAt: -1 })
      .toArray();
    response.remarks = "Success";
    response.message = "Successfully fetch";
    response.payload = results;
    res.json(response);
    client.close();
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Get specific employee
const getActiveEmployee = async (req, res) => {
  const employeeId = req.params.id;

  var response = {
    remarks: "error",
    message: "",
    payload: [],
  };

  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db();
    const collection = db.collection("employees");
    const results = await collection
      .find({ _id: new ObjectId(employeeId), isArchived: false })
      .toArray();
    console.log(results);

    if (results.length != 0) {
      response.remarks = "Success";
      response.message = "Successfully fetch";
      response.payload = results;
      res.json(response);
    } else {
      response.message = "Employee was not found";
      res.status(404).json(response);
    }

    client.close();
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Post a new employee
const addEmployee = async (req, res) => {
  // console.log(req)
  const {
    employee_Name,
    employee_Dept,
    employee_Skills,
    isArchived,
    createdAt,
  } = req.body.payload;

  const response = {
    remarks: "error",
    message: "",
    payload: [],
  };

  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db();
    const collection = db.collection("employees");

    // Create the employee document to insert
    const employeeDocument = {
      employee_Name,
      employee_Dept,
      employee_Skills,
      isArchived,
      createdAt,
    };

    // Insert the employee document into the collection
    const result = await collection.insertOne(employeeDocument);

    // Respond with the inserted document
    response.remarks = "Success";
    response.message = "Employee added successfully";
    response.payload = req.body.payload;
    res.status(200).json(response);

    client.close();
  } catch (err) {
    console.error("Error adding employee:", err);
    response.message = "Failed to add employee";
    res.status(400).json(response);
  }
};
//Update a employee
const updateEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const { employee_Name, employee_Dept, employee_Skills, updatedAt } =
    req.body.payload;

  const response = {
    remarks: "error",
    message: "",
    payload: [],
  };

  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db();
    const collection = db.collection("employees");

    // Update the employee document in the collection
    const result = await collection.updateOne(
      { _id: new ObjectId(employeeId) },
      {
        $set: {
          employee_Name,
          employee_Dept,
          employee_Skills,
          updatedAt,
        },
      }
    );

    // Check if the update was successful
    response.remarks = "Success";
    response.message = "Employee updated successfully";
    response.payload = { _id: employeeId, ...req.body.payload }; // Include updated payload
    res.status(200).json(response);

    client.close();
  } catch (err) {
    console.error("Error updating employee:", err);
    response.message = "Failed to update employee";
    res.status(400).json(response);
  }
};

//Update a employee
const archivedEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const { isArchived, updatedAt } = req.body.payload;

  const response = {
    remarks: "error",
    message: "",
    payload: [],
  };

  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db();
    const collection = db.collection("employees");

    // Update the employee document in the collection
    const result = await collection.updateOne(
      { _id: new ObjectId(employeeId) },
      {
        $set: {
          isArchived,
          updatedAt,
        },
      }
    );

    // Check if the update was successful
    response.remarks = "Success";
    response.message = "Employee archived successfully";
    response.payload = { _id: employeeId, ...req.body.payload }; // Include updated payload
    res.status(200).json(response);

    client.close();
  } catch (err) {
    console.error("Error archiving employee:", err);
    response.message = "Failed to archive employee";
    res.status(400).json(response);
  }
};

//Delete a employee
const deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const response = {
    remarks: "error",
    message: "",
    payload: null,
  };

  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db();
    const collection = db.collection("employees");

    // Delete the employee document from the collection
    const result = await collection.deleteOne({
      _id: new ObjectId(employeeId),
    });

    // Check if the deletion was successful
    if (result.deletedCount === 1) {
      response.remarks = "Success";
      response.message = "Employee deleted successfully";
      response.payload = { _id: employeeId };
      res.status(200).json(response);
    } else {
      response.message = "Employee not found";
      res.status(404).json(response);
    }

    client.close();
  } catch (err) {
    console.error("Error deleting employee:", err);
    response.message = "Failed to delete employee";
    res.status(400).json(response);
  }
};

module.exports = {
  getAllArchivedemployees,
  getAllActiveEmployees,
  getActiveEmployee,
  addEmployee,
  deleteEmployee,
  updateEmployee,
  archivedEmployee,
};
