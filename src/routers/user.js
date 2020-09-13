const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

////////////////////////
// GET
////////////////////////
router.get('/users/me', auth, async (req, res) => {

    // try {
    //     const users = await User.find( {} )
    //     res.send(users)
    // } catch (e) {
    //     res.status(500).send()
    // }

    res.send(req.user)

})

// Fetch an individual user
// Express gives the developer access to the :id parameter
router.get('/users/:id', auth, async (req, res) => {
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

        const token = await user.generateAuthToken()

        res.status(201).send( {user, token} )
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        const token = await user.generateAuthToken()

        // First way we were shown: very manual way of hiding public data
        // res.send( {user: user.getPublicProfile(), token} )
        // Behind the scenes these are calling JSON.stringify()
        res.send( {user, token} )
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async(req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send() 
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
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