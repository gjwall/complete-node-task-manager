require('./../src/db/mongoose')
const Task = require('../src/models/task')
const { ObjectID } = require('mongodb')

const deleteTaskAndCount = async (id) => {
    console.log('id passed ', id) 
    const task            = await Task.findByIdAndDelete(id)
    const incompleteCount = await Task.countDocuments( { completed: false } )
    return incompleteCount
}

deleteTaskAndCount('5f52a7746e9e8f28f065ddff').then((count) => {
    console.log('Current number of incomplete tasks = ', count)
}).catch((e) => {
    console.log('Error returned ', e)
})
