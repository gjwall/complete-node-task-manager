const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 8080

// Set up new middleware function
// Middleware enables this: new request -> do something -> run route handler
// app.use((req, res, next) => {

//     //console.log(req.method, req.path) 
//     if(req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }

// })

// app.use((req, res, next) => {
//     res.status(503).send('The system is undergoing maintenance')
// })

// Set up express to automatically parse incoming JSON
app.use(express.json())

app.use(userRouter) 
app.use(taskRouter) 

app.listen(port, () => {
    console.log('Server is up on port ', port)
})
