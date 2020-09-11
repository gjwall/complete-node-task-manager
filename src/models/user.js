const mongoose = require('mongoose') 
const validator = require('validator')
const bcrypt = require('bcryptjs')

// See Mongoose documents regarding middleware

// Declare the schema first
const userSchema = new mongoose.Schema({
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

// Need to use the function syntax so that the 'this' variable is available
// declaring functions with => means the 'this' variable is not available
userSchema.pre('save', async function (next) {
    const user = this

    console.log('Save called')
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    console.log(user.password)
    // Need to call the next callback
    next()
})

// User model
const User = mongoose.model('User', userSchema)

module.exports = User