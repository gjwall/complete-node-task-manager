const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 8080

// Set up express to automatically parse incoming JSON
app.use(express.json())

app.use(userRouter) 
app.use(taskRouter) 

app.listen(port, () => {
    console.log('Server is up on port ', port)
})

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {

//     const token = jwt.sign({_id: 'abc123'}, 'this is my new course', { expiresIn: '10 seconds' })
//     console.log(token)

//     const data = jwt.verify(token, 'this is my new course')
//     console.log(data)
// }

// myFunction()