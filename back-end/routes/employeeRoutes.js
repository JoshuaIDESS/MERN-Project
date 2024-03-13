const express = require('express')
const { getAllArchivedemployees, getAllActiveEmployees, getActiveEmployee, addEmployee, deleteEmployee, updateEmployee } = require('../controllers/employeeController')

const router = express.Router()

// GET list
router.get('/getArchivedemployees', getAllArchivedemployees)

router.get('/getActiveEmployees', getAllActiveEmployees)

// GET specific
router.get('/getActiveEmployee/:id', getActiveEmployee)

//POST
router.post('/addEmployee', addEmployee)

//DELETE
router.delete('/:id', deleteEmployee)

//UPDATE
router.patch('/updateEmployee/:id', updateEmployee)


module.exports = router