const express = require('express')
const authRouter = express.Router()
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

authRouter.post('/login', async(req,res)=>{
    const { name, password } = req.body

    try {
        const user = await User.findOne({name})
        if(!user){
            return res.status(401).json('User not found')
        }
        const passwwordMatch = await bcrypt.compare(password, user.hashedPassword)
        if(!passwwordMatch){
            return res.status(401).json('Password Incorrect')
        }

        const token = jwt.sign({id:user._id}, process.env.SECRET, {expiresIn: '1h'})
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

authRouter.post('/signup', async(req,res)=>{
    const name = req.body.name
    const password = req.body.password

    const saltRounds=10

    try {
        const hashedPassword = await bcrypt.hash(password,saltRounds)

        const newUser = new User({
        name: name,
        hashedPassword: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(`user ${savedUser.name} is saved`)

        res.status(200).json(`saved user ${name}`)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = authRouter