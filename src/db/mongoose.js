const mongoose = require('mongoose') 

const databaseName = 'task-manager-api'
const connectionURL = 'mongodb://127.0.0.1:27017/' + databaseName

mongoose.connect(connectionURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})

// User model
// const User = mongoose.model('User', {
//     name: {
//         type: String
//     }, 
//     age:  {
//         type: Number
//     }
// })

// const me = new User({
//     name: 'Graham',
//     age: 43
// })

// me.save().then((obj) => {
//     console.log(obj)
// }).catch((error) => {
//     console.log(error)
// })

// Task model
const Task = mongoose.model('Tasks', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const aTask = new Task({
    description: 'Task One',
    completed: false
})

aTask.save().then((savedTask) => {
    console.log(savedTask)
}).catch((error) => {
    console.log(error)
})