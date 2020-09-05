const mongoose = require('mongoose') 

const databaseName = 'task-manager-api'
const connectionURL = 'mongodb://127.0.0.1:27017/' + databaseName

mongoose.connect(connectionURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})

// Task model
// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true, 
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         required: false, 
//         default: false
//     }
// })

// const aTask = new Task({
//     description: '   Task Four   ',
//     completed: true
// })

// aTask.save().then((savedTask) => {
//     console.log(savedTask)
// }).catch((error) => {
//     console.log(error)
// })