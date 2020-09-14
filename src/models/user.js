const mongoose = require('mongoose') 
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

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
        unique: true, 
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function() {
    const user = this 
    const token = jwt.sign( { _id: user._id.toString() }, 'this is my new course' ) 
    user.tokens = user.tokens.concat( {token} )
    await user.save()
    return token
}

// The User/Task relationship video
// The virtual is not stored in the database
// it is only for mongoose
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// First way of doing the hiding private data
// userSchema.methods.getPublicProfile = function () { // Original signature
// The toJSON method does this with no other changes
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) {
        throw new Error('Unable to log in')
    }
    const isMatch = await bcrypt.compare(password, user.password) 
    if(!isMatch) {
        throw new Error('Unable to log in')
    }
    return user 
}

// Need to use the function syntax so that the 'this' variable is available
// declaring functions with => means the 'this' variable is not available
// Hash the user password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    // console.log(user.password)
    // Need to call the next callback
    next()
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany( {owner: user._id} )
    next()
})

// User model
// the text here 'User' needs to match when used in other models for referencing
// see task.js and the ref field
const User = mongoose.model('User', userSchema)

module.exports = User