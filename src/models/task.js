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

module.exports = Task