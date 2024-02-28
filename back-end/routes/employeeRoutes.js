const express = require('express')
const { getAllemployees, getEmployee, addEmployee, deleteEmployee, updateEmployee } = require('../controllers/employeeController')
const Employee = require('../models/employeeModel')

const router = express.Router()

// GET *
router.get('/', getAllemployees)

// GET specific
router.get('/:id', getEmployee)

//POST
router.post('/', addEmployee)

//DELETE
router.delete('/:id', deleteEmployee)

//UPDATE
router.patch('/:id', updateEmployee)

module.exports = router