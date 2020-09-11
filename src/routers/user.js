const express = require('express')
const User = require('../models/user')
const { findById } = require('../models/user')
const router = new express.Router()

////////////////////////
// GET
////////////////////////
router.get('/users', async (req, res) => {

    try {
        const users = await User.find( {} )
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }

})

// Fetch an individual user
// Express gives the developer access to the :id parameter
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id) 
        
        if(!user) {
            return res.status(404).send()
        }
        
        res.send(user)
    } catch (e) {
        return res.status(500).send()
    }

})

////////////////////////
// POST
////////////////////////
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

///////////////////////////
// PATCH (update) 
///////////////////////////
router.patch('/users/:id', async (req, res) => {

    const allowedUpdates = [ 'name', 'email', 'password', 'age' ]
    const updates = Object.keys(req.body)

    const isValid = updates.every( (update) => allowedUpdates.includes(update) )    

    if(!isValid) {
        return res.status(400).send( {error: 'Invalid updates'} )
    }

    try {
        // Make sure that Mongoose is run properly
        const user = await User.findById(req.params.id) 

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if(!user) {
            return res.status(404).send() 
        }

        res.send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

///////////////////////////
// DELETE (deletion)
///////////////////////////
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user) {
            return res.status(404).send()     
        }

        res.send(user)
    } catch(e) {
        res.status(400).send(e) 
    }
})


module.exports = router