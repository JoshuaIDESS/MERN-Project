const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeeSchema = new Schema({
    employee_Name:{
        type: String,
        required: true
    },
    employee_Dept:{
        type: String,
        required:true
    },
    employee_Skills:{
        type: Array,
        required: true
    },
    isArchived:{
        type: Boolean,
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model('employee', employeeSchema)