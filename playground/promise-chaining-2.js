require('./../src/db/mongoose')
const Task = require('../src/models/task')
const { ObjectID } = require('mongodb')

// 5f52a75724b8cd40f05238d6

Task.findByIdAndDelete('5f52a75724b8cd40f05238d6').then((task) => {
    console.log(task)
    return Task.countDocuments( { completed: false })
}).then((cnt) => {
    console.log('Number of incomplete tasks = ', cnt)
}).catch((e) => {
    console.log(e)
})