require('./../src/db/mongoose')
const Task = require('../src/models/task')

const deleteTaskAndCount = async (id) => {
    console.log('id passed ', id) 
    const task  = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments( { completed: false } )
    return count
}

deleteTaskAndCount('5f52a7746e9e8f28f065ddff').then((count) => {
    console.log('Current number of incomplete tasks = ', count)
}).catch((e) => {
    console.log('Error returned ', e)
})
