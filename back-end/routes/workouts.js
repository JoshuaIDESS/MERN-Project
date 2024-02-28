const express =  require('express')
const { addWorkout, getWorkout, getAllWorkouts, deleteWorkout, updateWorkout } = require('../controllers/workoutController')
const Workout = require('../models/workoutModel')

const router = express.Router()

// GET *
router.get('/', getAllWorkouts)

// GET specific
router.get('/:id', getWorkout)

//POST
router.post('/', addWorkout)

//DELETE
router.delete('/:id', deleteWorkout)

//UPDATE
router.patch('/:id', updateWorkout)

module.exports = router