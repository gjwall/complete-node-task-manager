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
    },
    password: {
        type: String, 
        required: true,
        trim: true, 
        // minlength: 7, // Can use this rather than the custom validator like the below - https://mongoosejs.com/docs/schematypes.html
        validate(value) {
            // Check 1 - does it contain "password"?
            if(value.toLowerCase().includes("password")) {
                throw new Error('The password field is not allowed to contain the word password')
            }
            if(value.length < 7) {
                throw new Error('The password must be at least six characters long')
            }
        }
    }
})

// const me = new User({
//     name: '   Amber   ',
//     email: '   Amber@amber.COM   ',
//     age: 8,
//     password: 'Password123'
// })

// me.save().then((obj) => {
//     console.log(obj)
// }).catch((error) => {
//     console.log(error)
// })

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

const aTask = new Task({
    description: '   Task Four   ',
    completed: true
})

aTask.save().then((savedTask) => {
    console.log(savedTask)
}).catch((error) => {
    console.log(error)
})