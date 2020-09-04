const mongoose = require('mongoose') 
const validator = require('validator')

const databaseName = 'task-manager-api'
const connectionURL = 'mongodb://127.0.0.1:27017/' + databaseName

mongoose.connect(connectionURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})

// User model
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid email address')
            }
        }
    },
    age:  {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})

const me = new User({
    name: '   Mia   ',
    email: '   MIA@mia.COM   '
    //age: 11
})

me.save().then((obj) => {
    console.log(obj)
}).catch((error) => {
    console.log(error)
})

// Task model
// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// })

// const aTask = new Task({
//     description: 'Task One',
//     completed: false
// })

// aTask.save().then((savedTask) => {
//     console.log(savedTask)
// }).catch((error) => {
//     console.log(error)
// })