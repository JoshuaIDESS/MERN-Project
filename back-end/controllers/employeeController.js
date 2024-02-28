const Employee = require('../models/employeeModel')
const mongoose = require('mongoose')

//Get all employees
const getAllemployees = async (req, res) => {
    const employee =  await Employee.find({}).sort({createdAt: -1})

    res.status(200).json(employee)
}

//Get specific employee
const getEmployee = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Employee does not exist'})
    }

    const employee = await Employee.findById(id)

    if (!employee) {
        return res.status(404).json({error: 'Employee does not exist'})
    }

    res.status(200).json(employee)
}

//Post a new employee
const addEmployee = async (req, res) => {
    const {employee_Name, employee_Dept, employee_Skills, isArchived} = req.body

    try {
        const employee = await Employee.create({employee_Name, employee_Dept, employee_Skills, isArchived})
        res.status(200).json(employee)
    }catch (err) {
        res.json(400).json({err: err.message})
    }
}

//Delete a employee
const deleteEmployee = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Employee does not exist'})
    }

    const employee = await Employee.findOneAndDelete({_id: id})

    if (!employee) {
        return res.status(400).jsom({error: 'Employee does not exist'})
    }

    res.status(200).json(employee)
}

//Update a employee
const updateEmployee = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Employee does not exist'})
    }

    const employee = await Employee.findOneAndUpdate({_id:id}, {
        ...req.body
    })

        if (!employee) {
        return res.status(400).jsom({error: 'Employee does not exist'})
    }

    res.status(200).json(employee)
}


module.exports = {
    getAllemployees, getEmployee, addEmployee, deleteEmployee, updateEmployee
}