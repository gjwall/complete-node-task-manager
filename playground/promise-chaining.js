require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('5f52a0d4df08c0141c1b782e', { age: 1 } ).then((user) => {
    console.log(user)
    // Return a new promise to chain into the next .then
    return User.countDocuments( { age: 1 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})