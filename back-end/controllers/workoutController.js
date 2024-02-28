const Workout = require("../models/workoutModel")
const mongoose = require('mongoose')

//Get all docuemnts
const getAllWorkouts = async (req, res) => {
    const workouts =  await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

//Get specific document
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}


//Post a document
const addWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }catch (err) {
        res.json(400).json({err: err.message})
    }
}

//Delete a document
const deleteWorkout = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(400).jsom({error: "No such workout"})
    }

    res.status(200).json(workout)
}

//Update a document
const updateWorkout = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id:id}, {
        ...req.body
    })

        if (!workout) {
        return res.status(400).jsom({error: "No such workout"})
    }

    res.status(200).json(workout)
}

//Archive a document

module.exports = {
    addWorkout, getWorkout, getAllWorkouts, deleteWorkout, updateWorkout
}