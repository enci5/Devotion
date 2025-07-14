// Code to authenticate user
const express = require('express')
const userRouter = express.Router()
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


userRouter.post('/signup', async (req, res) => {


    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    const username = req.body.username

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ error: 'Username already taken' });
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(req.body.password, saltRounds);

    const user = new User({
        username: username,
        passwordHash: hash

    })

    try {
        await user.save()
        res.status(201).json(`${user.username} registered successfully`)
        console.log(`Added ${user.username} to database`)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Registration Failed' })
    }

})



userRouter.post('/login', async (req, res) => {

    //hard corded username and password
    // Take the current username and password otherwise
    // maybe like const user = await User.findOne({req.body.username})

    //Have to do it this way because mongoose doesn't understand object literals

        try {
            const { username, password } = req.body;
            //console.log("USERNAME, PASSWORD", username, password)
            const user = await User.findOne({ username })
            if (!user) {
                return res.status(401).json({ error: 'Invalid Username/Password, try again' })
            }
            //console.log("IS THE USER RIGHT?", user)
    
            const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
            if (!passwordCorrect) {
                return res.status(401).json({ error: 'Authentication failed' });
            }
            //console.log("IS THE PASSWORD RIGHT?", passwordCorrect)
    
            if (passwordCorrect) {
                const payload = {
                    user_id: user._id
                }
    
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' })
                res.json({ token })
    
            } else {
                res.status(401).json({ error: 'Invalid Username/Password, try again' })
            }
        } catch (error) {
            return res.status(401).json({ error: "Internal Server Error" })
        }
    

    // User login

/*     try {
        console.log("BODY ON REQ", req.body)
        const { username, password } = req.body
        console.log("USERNAME, PASSWORD", username, password)
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' })
        }
        const passwordMatch = await bcrypt.compare(password, user.passwordHash)
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' })
        }
        const token = jwt.sign({ userId: user._id }, 'process.env.JWT_SECRET', {
            expiresIn: '10h',
        });
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({ error: 'Login failed' })
    } */

})




module.exports = userRouter