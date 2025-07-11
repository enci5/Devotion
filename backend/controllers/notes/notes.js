
const express = require('express')
const notesRouter = express.Router()
const Note = require('../../models/note')
const jwt = require('jsonwebtoken');




notesRouter.get('/', authenticateToken, (req, res) => {

    Note.find({}).then(notes => {
        res.json(notes)
    })


    //Posts only the user has access to
    //res.json(notes.find({}).then(notes=> notes.username === req.username))

})

notesRouter.post('/', authenticateToken, async (req, res) => {


    const title = req.body.title
    const content = req.body.content

    const note = new Note({
        title: title,
        content: content
        //Tie the user to the note
        //user: req.user.username
    })
    try {
        await note.save()
        res.status(200).json(`${title} is added to the database`)
        console.log(`Added ${title} to database`)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Bad Request' })
    }

})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({ error: 'Token not valid' })

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })

}

module.exports = notesRouter