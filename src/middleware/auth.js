const jwt = require('jsonwebtoken') 
const User = require('../models/user')

const auth = async (req, res, next) => {
    
    try {
        // Look for the header the user is going to provide
        const token = req.header('Authorization').replace('Bearer ','')
        // Validate the header
        const decoded = jwt.verify(token, 'this is my new course')
        // Find the associated user
        const user = await User.findOne( { _id: decoded._id, 'tokens.token': token } )

        // Either we call next or if not authenticated we send back an error
        if(!user) {
            throw new Error() 
        }

        req.user = user

        next()
    } catch(e) {
        res.status(401).send({error: 'Please authenticate'})
    }
}


module.exports = auth