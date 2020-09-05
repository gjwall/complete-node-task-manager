const mongoose = require('mongoose') 

// Task model
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true, 
        trim: true
    },
    completed: {
        type: Boolean,
        required: false, 
        default: false
    }
})

// const aTask = new Task({
//     description: '   Task Four   ',
//     completed: true
// })

// aTask.save().then((savedTask) => {
//     console.log(savedTask)
// }).catch((error) => {
//     console.log(error)
// })

module.exports = Task