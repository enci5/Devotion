// Code to authenticate user
const express = require('express')
const userRouter = express.Router()
const User = require('../../models/user')
const jwt = require('jsonwebtoken')




userRouter.post('/login', async (req, res) => {


    //hard corded username and password
    // Take the current username and password otherwise
    // maybe like const user = await User.findOne({req.body.username})
    if (req.body.username === 'test' && req.body.password === 'pass') {

        const payload = {
            //Again this is just hardcoded with a user fill this in with the current
            // Logged in user
            username: req.body.username
            //userid: req.body.user_id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' })

        res.json({ token })
    } else {
        res.status(401).json({ error: 'Invalid' })
    }
})





module.exports = userRouter