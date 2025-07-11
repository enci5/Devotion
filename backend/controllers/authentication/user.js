// Code to authenticate user
const express = require('express')
const userRouter = express.Router()
const User = require('../../models/user')
const jwt = require('jsonwebtoken')




userRouter.post('/login', async (req, res) => {

    if (req.body.username === 'test' && req.body.password === 'pass') {

        const payload = {
            username: req.body.username
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' })

        res.json({ token })
    } else {
        res.status(401).json({ error: 'Invalid' })
    }
})





module.exports = userRouter