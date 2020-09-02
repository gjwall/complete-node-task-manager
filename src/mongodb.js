const mongodb = require('mongodb') 

const MongoClient = mongodb.MongoClient

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

    // Insert a single document
    // db.collection('users').insertOne({
    //     name: 'Bob',
    //     age: 60
    // }, (error, result) => {
    //     if(error) {
    //         return console.log("Error during insert " + error)
    //     }

    //     console.log(result.ops)
    // })

    /// Insert many documents
    db.collection('users').insertMany([
        {
            name: 'Bob2',
            age: 50
        },
        {
            name: 'Bob3',
            age: 40
        }
    ], (error, result) => {
        if(error) {
            return console.log("Error during insert " + error)
        }

        console.log(result.ops)
    })

})