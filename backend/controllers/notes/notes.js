
const express = require('express')
const notesRouter = express.Router()
const Note = require('../../models/note')
const jwt = require('jsonwebtoken');
const User = require('../../models/user')




notesRouter.get('/', authenticateToken, (req, res) => {

    Note.find({ user: req.user.user_id }).populate('user').then(notes => {
        res.json(notes)
    })
        .catch(err => {
            res.status(500).json({ error: "error retrieving ntoes" })
        })


    //Posts only the user has access to
    //res.json(notes.find({}).then(notes=> notes.username === req.username))
    // also include user_id find by user notes since its the primary key
    /*     Note.find({ username: req.user.username }).then(notes => {
            res.json(notes)
        }) */

})

notesRouter.post('/', authenticateToken, async (req, res) => {

    console.log("<-----------------------------INSIDE NOTE /POST ROUTE----------------------------->")

    console.log("BODY OF RESPONSE", req.body)
    console.log("THE USER", req.user)

    const { title, content } = req.body
    const userId = req.user.user_id


    console.log("USER ID", userId)

    const note = new Note({
        title: title,
        content: content,
        user: userId

    })

    console.log("HERES THE NOTE OBJECT", note)
    try {
        //SaVING THE NEW NOTE TO THE DATABASE
        const savedNote = await note.save()

        // NEED TO ALSO UPDATE THE USER's NOTES IN THE ARRAY for user database/model

        await User.findByIdAndUpdate(
            userId,
            { $push: { notes: savedNote._id } },
            { new: true }
        )

        res.status(200).json(`${title} is added to the database`)
    } catch (error) {
        console.log("ERROR SAVING NOTE OR UPDATING USER", error)
        res.status(400).json({ error: 'Bad Request' })
    }

})

function authenticateToken(req, res, next) {
    console.log("<-----------------------------INSIDE AUTHENTICATE TOKEN----------------------------->")

    console.log("BODY BEFORE THE TOKEN", req.body)
    console.log("AUTHENTICATING TOKEN")
    const authHeader = req.headers['authorization']

    // Bearer 'TOKEN'
    const token = authHeader && authHeader.split(' ')[1]
    console.log("THIS IS THE TOKEN ----> ", token)
    if (token == null) return res.status(401).json({ error: 'Token not valid' })

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        //Take user_id
        // It's adding the user to the request object here
        if (err) return res.sendStatus(403)
        req.user = user
        console.log("THIS IS THE USER IN TOKEN AUTHENTICATION-->", req.user)
        next()
    })

}

module.exports = notesRouter