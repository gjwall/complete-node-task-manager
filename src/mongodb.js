const {MongoClient, ObjectID} = require('mongodb') 

// Set up these constants
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// Set up the connection
MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connet to the database ' + error) 
    }

    console.log('Connected') 

    // Connect to a specific database
    const db = client.db(databaseName)

    // const tasksCollection = 'tasks'
    // const taskArray = [
    //     {
    //         description: 'task one',
    //         completed: true
    //     },
    //     {
    //         description: 'task two',
    //         completed: false
    //     },
    //     {
    //         description: 'task three',
    //         completed: true
    //     }
    // ]

    // db.collection(tasksCollection).insertMany(taskArray, (error, result) => {
    //     if(error) {
    //         return console.log('The insert many failed ' + error)
    //     }

    //     console.log(result.ops) 
    // })

    db.collection('tasks').updateMany({
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })


})